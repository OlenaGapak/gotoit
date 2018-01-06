
import _ from 'lodash';


import {chatMessage} from "../components/Chat";

import bulkStyler from '../services/bulkStyler';
import {skills, workers_bonus_items} from '../data/knowledge';

import Narrator from '../services/Narrator';
import ValueCache from '../services/ValueCache';

import {getData, tick} from '../App';

class WorkerModel {
    constructor(name, stats, is_player = false) {
        this.id = is_player ? 'player' : _.uniqueId('worker');
        this.name = name;
        this.stats = stats;
        this.is_player = is_player;
        this.expirience = JSON.parse(JSON.stringify(skills));
        this.standing = 0;
        this.standing_after_salary_rising = 0;
        this.morale = 100;
        this.accept_default = true;

        this.temper = {
            earliness: _.random(0, 3), variability: _.random(0, 3)
        };

        this.feelings = new ValueCache(24, () => { return Narrator.workerFeelings(this); }); //{tick: 0, value: ''};

        this.efficiency = new ValueCache(24, () => { return this.calcEfficiencyReal() });

        this.stamina = 1000;
        this.to_vacation_ticker = 0;
        this.to_vacation = false;
        this.in_vacation_ticker = 0;
        this.in_vacation = false;
        this.to_leave_ticker = 0;
        this.to_leave = false;

        this.items = JSON.parse(JSON.stringify(skills));
        _.forEach(this.items, (val, key) => { this.items[key] = {exp: false, flat: false, percent: false}; });

        this.fed_ticker = 0;

        this.facts = {
            project_finished: 0,
            tick_hired: 0, money_earned: 0,
            tasks_done: 0, training_tasks_done: 0, bugs_passed: 0,
            refactored: 0, tests_wrote: 0, retrospected: 0};
    }

    statsSum() {
        return _.sum(_.values(this.stats));
    }

    drainStamina() {
        this.stamina--;
     //   console.log(this.stamina);
    }

    tellFeelings() {
        return this.feelings.get();
    }

    getSalary() {
        if (this.is_player) {
            return 0;
        }
        else {
        //    console.log("standing " + this.standing + " means " + (1 + (this.standing/(12*4*7*8*Math.PI))));
            return Math.floor((this.statsSum() + _.max(_.values(this.stats))) * (1+(this.getOverrate()/100)));
        }
    }

    isWorkingTime(time, micromanagement, office_things) {
        let variability = _.random(-this.temper.variability, this.temper.variability);
        let mod = variability + this.temper.earliness;

        //let office_things_bonus = (office_things.coffeemaker ? 10 : 0) + (office_things.lanch ? 25 : 0 ) + office_things.gadget;

        let is_working_time = (
            time.hour >= (office_things.coffeemaker ? -1 : 0)   + 9 + mod &&
            time.hour <= (this.fed_ticker > 1 ? 2 : 0 )        + 17 + mod &&
            ((time.day !== 6 && time.day !== 0) || _.random(1, (20-(this.temper.variability*3))) === 1) && // variability guys work on weekends more often
            (_.random(1, 10 - (this.temper.variability * 0.5)) !==1) // variability guys eblanyat more often
        ) ? true : false;

        return this.efficiencyCheck(micromanagement) ? is_working_time : false;
    }

    efficiencyCheck(micromanagement) {
        return (
            _.random(1, 100) <= (micromanagement
                ? Math.floor((this.getEfficiency() + 90) / 2)
                : this.getEfficiency())
        );
    }

    getEfficiency() {
     //   if (tick < 10) return 100;

        let efficiency = this.calcEfficiency();

        /*
        if (((tick - this.facts.tick_hired)/24) < 30) return 100;
        if (((tick - this.facts.tick_hired)/24) < 100) return Math.floor((efficiency + 100) / 2);
        */

        // smooth first 14 days
     //   if (((tick - this.facts.tick_hired)/24) < 14) return Math.floor((efficiency + 100) / 2);

        return efficiency;
    }

    staminaPenalty() {
        const stamina_factor = this.stamina / (1000/10);
        return Math.max(Math.min(Math.floor(stamina_factor), 10), -10);
    }

    workloadPenalty() {
        const task_preferred = (Math.ceil((tick - this.facts.tick_hired)/24) * 3);
        const tasks_stream = Math.max(Math.min(Math.floor(20 * (1-((200+task_preferred) / ((200+(this.facts.tasks_done - this.facts.training_tasks_done)))))), 20), -20);
        const overloaded = Math.floor((100 - this.morale) / 5);
     //   console.log('Workload: ' + tasks_stream + ' ' + overloaded);
        return (Math.abs(tasks_stream) > overloaded) ? tasks_stream : overloaded;
       // return Math.max(Math.abs(Math.max(Math.min(Math.floor(tasks_stream), 20), -20)), Math.abs(Math.floor(overloaded)));
    }

    difficultyPenalty() {
        let difficulty_ratio = (200+(this.facts.bugs_passed*3)) / (200+this.facts.tasks_done);
        let thirst_for_difficulty = (100+_.max(_.values(this.stats))) / (100+(this.statsSum()/4));
        // console.log(difficulty_ratio, thirst_for_difficulty);
        const difficulty_stream = 20 * (1-(difficulty_ratio/thirst_for_difficulty));
        return Math.max(Math.min(Math.floor(difficulty_stream), 20), -20);
        

     //   const tasks_difficulty = Math.min(20, 20 * (1-((200+(this.facts.bugs_passed * Math.PI)) / ((200+(this.facts.tasks_done))))));
     //   return Math.max(Math.min(Math.floor(tasks_difficulty), 20), -20);
    }

    educationPenalty() {
        let knowledge_ratio = (200+(this.facts.training_tasks_done*3)) / (200+this.facts.tasks_done);
        let thirst_for_knowledge = (100+(this.statsSum()/4)) / (100+_.max(_.values(this.stats)));
       // console.log(knowledge_ratio, thirst_for_knowledge);
        const education_stream = 20 * (1-(knowledge_ratio/thirst_for_knowledge));
        return Math.max(Math.min(Math.floor(education_stream), 20), -20);
    }

    collectivePenalty() {
        let collective_sum = 0;
        getData().workers.forEach((worker) => { collective_sum += worker.statsSum(); });
        const collective_avg = collective_sum/getData().workers.length;
        const collective = 20 * (1-((10 + collective_avg)/(10 + this.statsSum())));
        return Math.max(Math.min(Math.floor(collective), 20), -20);
    }

    getOverrate() {
        return (((1 + (this.standing/(24*7*59.524)))*100)-100).toFixed(2);
    }

    getMotivate() {
        return Math.sqrt(this.standing_after_salary_rising)/Math.PI;
    }

    calcEfficiency() { // happiness
       // return this.calcEfficiencyReal();
        return this.efficiency.get();
    }

    calcEfficiencyReal() { // happinessReal
      //  const stamina = this.staminaPenalty();
        const tasks_stream = this.workloadPenalty();
        const tasks_difficulty = this.difficultyPenalty();
        const education_stream = this.educationPenalty();
        const collective = this.collectivePenalty();

        let efficiency = 20 +
            + Math.floor(this.getOverrate() / 10)
            + this.getMotivate()
            + getData().office_things.gadget
         //   + (10 - Math.abs(stamina))
            + (20 - Math.abs(tasks_stream))
            + (20 - Math.abs(tasks_difficulty))
            + (20 - Math.abs(education_stream))
            + (20 - Math.abs(collective));

       // console.log(Math.floor(this.getOverrate() / 10));
        //console.log(efficiency);
        //console.log(tasks_stream, tasks_difficulty, education_stream, collective);

        return Math.ceil(efficiency);

        //return 100;
    }

    getStatsData(stat) {
        return (this.stats[stat] + this.expirience[stat]/100).toFixed(2) + ((this.items[stat].flat === true) ? ' +'+workers_bonus_items[stat].flat.bonus+' ' : '') + ((this.items[stat].percent === true) ? ' +'+workers_bonus_items[stat].percent.bonus+'% ' : '');
    }

    getResources(worker_roles, focus_on=null, micromanagement) {
        let r = (stat) => { return _.random(1, this.stats[stat]); };
        let resource = 0;
        
        this.standing++;

        let stat = focus_on ? focus_on : _.sample(worker_roles);

        if (micromanagement) {
            let dices = [r(stat), r(stat), r(stat)];
            dices.sort((a,b) => { return a - b; });
            resource = dices[1];
        }
        else {
            resource = r(stat);
        }

        if (this.items[stat].flat === true) {
            resource += workers_bonus_items[stat].flat.bonus;
        }

        if (this.items[stat].percent === true) {
            resource *= 1 + (workers_bonus_items[stat].percent.bonus/100);
            resource = Math.floor(resource);
        }

        let ret = {};
        ret[stat] = resource;
        return ret;
    }

    getSideResource() {
        this.standing++;
        let s = this.statsSum()/_.values(this.stats).length;
        return Math.floor(_.random(1, s*2));
    }

    getRareSideResource() {
        return Math.ceil(Math.sqrt(this.getSideResource()));
    }

    addExperience(learned) {
        Object.keys(learned).forEach((stat) => {
            if (learned[stat] !== 0) {
                let learned_stat = Math.ceil((learned[stat] * 5) / (this.stats[stat]));
                if (workers_bonus_items[stat].exp.bonus) {
                    learned_stat *= 1 + (workers_bonus_items[stat].percent.bonus/100);
                }
                this.expirience[stat] += learned_stat;
                if (this.expirience[stat] >= 100) {
                  //  console.log('stat rise');
                    chatMessage(this.name, ' rise '+stat+' skill!', 'success');
                    this.expirience[stat] -= 100;
                    this.stats[stat]++;
                }
            }
        });
    }

    static generate(quality=1) {
        let stats_bulk = {design: this.genStat(quality), manage: this.genStat(quality), program: this.genStat(quality)};

        let stats = bulkStyler.speciality(stats_bulk);

        return this.generateWithStats(stats);
    }

    static generateWithStats(stats) {
        return new WorkerModel(this.genName(), stats);
    }

    static generateBlank() {
        return this.generateWithStats(JSON.parse(JSON.stringify(skills)));
    }

    static generateAgency(agency_state) {
        //console.log(agency_state);
        let stats = _.mapValues(skills, (value, skill) => {
            let stat = _.random(agency_state.min_stats[skill], agency_state.max_stats[skill]);
            //console.log(skill, stat);
            return stat;
        });
        //console.log(stats);
        let worker = this.generateWithStats(stats);
        worker.standing = Math.floor(_.random(agency_state.min_salary, agency_state.max_salary) * 26.888);
        //console.log(worker);
        return worker;
    }

    static generatePlayer() {
        let name = '';//prompt('Type your name', this.genName());

        return new WorkerModel(
            name,
            _.mapValues(skills, () => { return 1; }), // {design: 1, manage: 1, program: 1},
            true
        );
    }

    static genName() {
        var first_names = ['Oleg', 'Igor', 'Jack', 'Kristofer', 'Mike', 'Micheal', 'Marlena', 'Loris', 'Breana', 'Gregorio', 'Freddy', 'Devin', 'Nicol', 'Alexey', 'Aleksandr', 'Peter'];
        var second_names = ['Down', 'Kolpak', 'Vasilenko', 'Smith', 'Eisenhauer', 'Kirschbaum', 'Larose', 'Alvarado', 'Christon', 'Jaynes', 'Mcmillian', 'Radcliffe', 'Engelhard', 'Prambpharatha'];
        return _.sample(first_names) + ' ' + _.sample(second_names);
    }

    static genStat(quality) {
        return _.random(1, quality);
    }

}

export default WorkerModel;