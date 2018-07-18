
import _ from 'lodash';

import {
    current_tick,
    setCurrentTick,
    projects_done,
    setGameDate,
} from '../App';
import {addAction} from '../components/ToastNest';
import Lorer from '../services/Lorer';
import WorkerModel from '../models/WorkerModel';
import { public_relations } from "./knowledge";


export const rules = {
    matrix_show: {onTick: (state) => { state.matrix_show = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); return state; }},

    nextDay: {
        onTick: function(state) {
            const data = state.data;
            const date = data.date;
            let time = data.date;
            let current_tick = data.date.tick;

            var real_date = new Date();
            var game_date = new Date();
            game_date.setDate(real_date.getDate()+(date.tick/24));

            time.tick++;
            setCurrentTick(time.tick);
            setGameDate(game_date);
            console.log(game_date)
            data.helpers.setTimelineScale();

            //time.hour++;
            time.hour = game_date.getHours();

            if (time.hour === 1 && time.date === 15 && game_date.getDate() === 15) {

                // get Salary
                // sorting workers from lowest to highest salary
                let workers = data.workers.sort((worker1, worker2) => {
                    return worker1.salary - worker2.salary;
                });

                workers.forEach((worker) => {
                    this.paySalary(worker, current_tick);
                });
            }

            if (time.hour === 0) {
                console.log('A new day');

                //time.hour = 1;
                data.workers.forEach((worker) => {
                    // console.log('worker '+worker.id+' morale '+worker.morale);
                    if (worker.morale < 100 && _.random(1, 24)) worker.morale++;

                    if (!worker.is_player) {
                        let dissatisfaction = Math.floor((10000 - Math.pow(worker.calcEfficiency() + 50, 2)) / 30);
                        let smoothing = 1 + (parseInt(worker.getOverrate(), 10) / 100);
                        let breakpoint = _.random(1, 20000);
                        //console.log(dissatisfaction, worker.calcEfficiency(), Math.floor(Math.pow(worker.calcEfficiency(), 2)), breakpoint);
                        if ((dissatisfaction / smoothing) > breakpoint) {
                            worker.to_leave = true;
                            worker.to_leave_ticker = 24 * 7 * 2; // 2 weeks
                            data.helpers.addTimelineEvent('leave', 'Leaving from company', worker, 24*7*2); // 14 days
                            addAction(worker.name + ' decided to leave from your company in two weeks', {
                                timeOut: 20000,
                                extendedTimeOut: 10000
                            }, 'error');
                        }
                    }
                });

                data.statistics.money_current_value.buffer = data.money;
                data.statistics.btc_current_value.buffer = data.btc;
                data.statistics.candidates_resumes.buffer = data.candidates.resumes.length;
                data.statistics.projects_in_process.buffer = data.projects.length;

               _.mapValues(data.statistics, (stats, key) => {
                    stats.values.push(stats.buffer)
                });

                data.exchange_statistics.btc.values.push(data.current_btc_price);
                data.exchange_statistics.share0.values.push(data.current_share0_price);
                data.exchange_statistics.share1.values.push(data.current_share1_price);
                data.exchange_statistics.share2.values.push(data.current_share2_price);



            }

            //MAX STATS UPDATE
            //workers hired
            data.workers.forEach((worker) => {
                if (worker.stats.design > data.max_stat) data.max_stat = worker.stats.design;
                if (worker.stats.program > data.max_stat) data.max_stat = worker.stats.program;
                if (worker.stats.manage > data.max_stat) data.max_stat = worker.stats.manage;
            });
            //candidates for hiring
            data.candidates.resumes.forEach((candidate) => {
                if (candidate.stats.design > data.max_candidates_stat) data.max_candidates_stat = candidate.stats.design;
                if (candidate.stats.program > data.max_candidates_stat) data.max_candidates_stat = candidate.stats.program;
                if (candidate.stats.manage > data.max_candidates_stat) data.max_candidates_stat = candidate.stats.manage;
            });
            //offered_projects
            data.offered_projects.forEach((project) => {
                if (project.estimate.design > data.max_stats_projects_offered) data.max_stats_projects_offered = project.estimate.design;
                if (project.estimate.program > data.max_stats_projects_offered) data.max_stats_projects_offered = project.estimate.program;
                if (project.estimate.manage > data.max_stats_projects_offered) data.max_stats_projects_offered = project.estimate.manage;
            });




            if (time.hour === 14 && data.office_things.lunch) { // lunch time!
                if ((data.workers.length * 25) <= data.money) {
                    this.chargeMoney(data.workers.length * 25);
                    data.workers.forEach((worker) => { worker.fed_ticker += 24; });
                }
                else {
                    addAction('Not enough money for lunch', {
                        timeOut: 5000,
                        extendedTimeOut: 2000
                    }, 'error');
                    this.lunchOff();
                }
            }

            if (time.date !== 1 && game_date.getDate() === 1) {
                // first day
                if (data.office.size > 1) {
                    this.chargeMoney(data.office.price);
                    data.statistics.office_costs.buffer += data.office.price;
                }

                // allow hackathon this month
                data.wasRecentlyHackathon = false;

                //loans
                data.taken_loans.forEach((loan) => {
                    this.chargeMoney(Math.floor((loan.money * (1 + (loan.interest/100)))/loan.time));
                    loan.timer--;
                    data.early_payed_loans++;
                });

                (_.remove(data.taken_loans, (loan) => { return (loan.timer === 0); })).forEach((loan) => {
                    data.old_loans.push(loan);
                });
            }
            time.date = game_date.getDate();
            time.day = game_date.getUTCDay();

            time.is_working_time = !!(
            time.hour >= 10 &&
            time.hour <= 18 &&
            time.day !== 6 &&
            time.day !== 0);

            data.date = time;
            state.data = data;


            data.on_tick_effects = _.filter(data.on_tick_effects, (effect) => {
                let same = _.filter(data.on_tick_effects, (effect2) => {
                    return effect.type === effect2.type
                });
                effect.click_count = same.length;
                return public_relations[effect.type].long > data.date.tick - effect.start_tick;
            });

            _.each(data.on_tick_effects, (effect) => {
                public_relations[effect.type].onTickByDelta(data, data.date.tick - effect.start_tick, effect.click_count);

            } );

            return state;
        }
    },

    rollTurn: {
        onTick: function(state) {

            const data = state.data;

            switch (current_tick) {
                case 5:
                    addAction('Hi there! Important messages will appear in this corner of the screen.', {timeOut: 15000, extendedTimeOut: 5000, closeButton: false}, 'success');
                    break;
                case 24:
                    addAction('First of all, choose the origin and formation of your character.', {timeOut: 15000, extendedTimeOut: 5000, closeButton: false}, 'success');
                    break;
                case 10:
                    //   addAction('Then find your first project.', {timeOut: 15000, extendedTimeOut: 5000}, 'success');
                    break;
                default:
                    break;
            }

            const x = current_tick + 2000;
            data.current_btc_price = Math.floor(Math.abs(Math.sin(x/19)) * x/3 + Math.abs(Math.sin(Math.sqrt(x))) * x + Math.abs(Math.sin(Math.sqrt(x/7))) * x * 2 + Math.abs(Math.sin(Math.sqrt(x/227))) * x + x);

            data.current_share0_price = Math.floor(Math.abs(Math.sin(x/19)) * x/3 + Math.abs(Math.sin(Math.sqrt(x))) * x + Math.abs(Math.sin(Math.sqrt(x/7))) * x * 2 + Math.abs(Math.sin(Math.sqrt(x/227))) * x + x);
            data.current_share1_price = Math.floor(Math.abs(Math.sin(x/19)) * x/3 + Math.abs(Math.sin(Math.sqrt(x))) * x + Math.abs(Math.sin(Math.sqrt(x/7))) * x * 2 + Math.abs(Math.sin(Math.sqrt(x/227))) * x + x);
            data.current_share2_price = Math.floor(Math.abs(Math.sin(x/19)) * x/3 + Math.abs(Math.sin(Math.sqrt(x))) * x + Math.abs(Math.sin(Math.sqrt(x/7))) * x * 2 + Math.abs(Math.sin(Math.sqrt(x/227))) * x + x);



            //data.current_btc_price = Math.abs(Math.sin(x/19)) * x + Math.abs(Math.sin(Math.sqrt(x))) * x + Math.abs(Math.sin(Math.sqrt(x/7))) * x + Math.abs(Math.sin(Math.sqrt(x/227))) * x + x;

            //data.current_btc_price = Math.floor(Math.abs(Math.sin(Math.sqrt(x))) * x + Math.abs(Math.sin(Math.sqrt(x/7))) * x + Math.abs(Math.sin(Math.sqrt(x/227))) * x);

            /*
             if (current_tick < (24 * 7)) {
             return false; // no generation first week
             }
             */


            if (data.reputation >= 100) {
                data.reputation -= 100;
                this.pushNewProject();
            }

            if (data.rumor >= 100) {
                data.rumor -= 100;
                this.pushNewCandidate();
            }

            if (_.random(0, 24*30) < data.meetup) {
                data.rumor++;
            }

            if (_.random(0, 24) < data.demo) {
                data.reputation++;
            }

            if (_.random(0, 24*356) < data.miner) {
                data.btc++;
            }

            let probability = Math.min(10, (1 + (data.workers.length * projects_done * 0.1))) / 24;
            if (data.offered_projects.length < 5 && _.random(0.0, 100.0) < probability) {
                this.pushNewProject();
            }

            /*
             if (data.candidates.resumes.length > 0) { //  WTF section
             if (_.random(1, 100) < Math.sqrt(probability)) {
             _.remove(data.candidates.resumes, (candidate) => {
             return (candidate.id === data.candidates.resumes[0].id);
             });
             }
             if (_.random(1, 24 * 7 * 8) === 1) {
             _.remove(data.candidates.resumes, (candidate) => {
             return (candidate.id === data.candidates.resumes[0].id);
             });
             }
             }
             */

            let spike = (current_tick > (24 * 30) & current_tick < (24 * 60)) ? 40 : 0;
            if (Math.floor(_.random(1, 24 * (50 - Math.max(spike, Math.min(25, projects_done*0.2))))) === 1 && data.candidates.resumes.length < 5) {
                this.pushNewCandidate();
            }

            if (Math.floor(_.random(1, (24*7*12)/(1+(projects_done*0.1)))) === 1 && data.candidates.resumes.length < 5) {
                let experience = _.random(10, 20);
                let worker = WorkerModel.generate(experience);
                worker.standing += experience * 12 * _.random(5, 10+experience);
                data.candidates.resumes.push(worker);
                let max_skill = _.maxBy(Object.keys(worker.stats), function (o) { return worker.stats[o]; });
                addAction('Excellent '+max_skill+' ninja '+worker.name+' looking for a job');
            }

            if (current_tick < (24 * 30 * 12)) {
                state.data = data;
                return state; // no additional generation first 12 month
            }

            if (!data.wasRecentlyHackathon && _.random(1, 24*60)) {
                data.wasRecentlyHackathon = true;
                data.offered_projects.push(Lorer.hackathon());
            }

            state.data = data;
            return state;
        }
    },


    work: {
        onTick: function(state) {
            const data = state.data;

            //set maximum current skill


            _.shuffle(data.workers).forEach((worker) => {
                worker.tick();

                if (!worker.is_player) {
                    // worker quiting
                    if (worker.to_leave) {
                        if (worker.to_leave_ticker <= 0) {
                            addAction(worker.name + ' resigned from your company', {
                                timeOut: 20000,
                                extendedTimeOut: 10000
                            }, 'error');
                            this.dismissEmployer(worker.id);
                        }
                        else {
                            worker.to_leave_ticker--;
                        }
                    }

                    if (_.random(1, (1 + parseFloat(worker.getOverrate())).toFixed(0)) === 1) { // additional drain even worker do not work
                        worker.drainStamina();
                    }

                    if (worker.standing_after_salary_rising > 0) {
                        worker.standing_after_salary_rising--;
                    }
                }

                // Vacation
                if (!worker.to_vacation && !worker.in_vacation && worker.stamina <= 0) {
                    worker.proposeVacation();
                    state.data.helpers.addTimelineEvent('vacation','Going to vacation', worker, 7 * 2) //14 days
                }
                if (worker.to_vacation) {
                    worker.to_vacation_ticker--;
                    if (worker.to_vacation_ticker <= 0) {
                        let weeks = _.random(1,4)
                        worker.sendToVacation(weeks);
                        state.data.helpers.lineEvent('vacation','Going to vacation', worker, 7 * weeks)
                    }
                }
                if (worker.in_vacation) {
                    //console.log('worker in vacation');
                    worker.in_vacation_ticker--;
                    worker.stamina += 5;
                    if (worker.in_vacation_ticker === 0) {
                        worker.in_vacation = false;
                        worker.stamina += 500;
                        addAction(worker.name + ' comes back from vacation', {
                            timeOut: 5000,
                            extendedTimeOut: 3000
                        }, 'success');
                    }
                    return false;
                }

                if (!worker.in_vacation) { // drain even worker do not work
                    worker.drainStamina();
                }

                // if you don't pay, your guys don't work
                if (!worker.is_player && !worker.get_monthly_salary) return false;

                let worker_meetings = data.projects.filter((project) => { return (project.isNeed(this.getRelation(worker.id, project.id)) && project.stage === 'open' && project.type === 'meeting' && !project.is_paused);});
                //console.log(worker_meetings, data.relations);
                if (worker_meetings.length > 0) { // Meeting
                    let temp_meeting = _.sample(worker_meetings);;
                    if (temp_meeting.meeting_type === 'fire' || worker.isWorkingTime(data.date, false, data.office_things)) {
                        let meeting = temp_meeting;
                        // get Salary
                        if (!worker.is_player) {
                            let salary = worker.getSalary();
                            this.chargeMoney(salary, true);
                            worker.facts.money_earned += salary;
                            meeting.facts.money_spent += salary;
                        }
                        worker.drainStamina();
                        worker.gotoMeeting(meeting);
                    }
                }
                else { // Work
                    let worker_projects = data.projects.filter((project) => {
                        return (project.isNeed(
                            this.getRelation(worker.id, project.id)) && (project.stage === 'open' || project.stage === 'fixing') && !project.is_paused);
                    });
                    //     console.log(worker_projects);
                    // work on one of projects
                    if (worker_projects.length > 0) {
                        this.work_on_project(worker, _.sample(worker_projects));
                    }
                    else {
                        //  console.log('worker have not projects');
                        return false;
                    }
                }
            });

            state.data = data;
            return state;
        }
    },

    projects: {
        onTick: function(state) {
            state.data.projects.forEach((project) => {

                if (project.is_paused) {
                    console.log('skip calculate paused project ' + project.name);
                    return false;
                }

                //if (!(project.stage === 'open' || project.stage === 'fixing' )) {
                if (!project.stage === 'open') {
                    console.log('skip calculate project ' + project.name);
                    return false;
                }



                switch (project.type) {
                    case 'meeting':
                        project.deadline--;
                        if (project.deadline <= 0) {
                            this.finishMeeting(project.id);
                            return;
                        }
                        break;

                    case 'own':
                        if (project.stage === 'fixing' && project.tasksQuantity() === 0) {
                            if (project.bugsQuantity() !== 0) {
                                this.fixProject(project.id);
                                return;
                            }

                            if (project.bugsQuantity() === 0) {
                                this.finishProject(project.id);
                                return;
                            }
                        }
                        break;

                    case '':
                        break;

                    default:
                        if (project.tasksQuantity() === 0 && project.bugsQuantity() === 0) {
                            this.finishProject(project.id);
                            return;
                        }

                        project.deadline--;
                        if (project.deadline <= 0 && project.type !== 'draft') {
                            this.failProject(project.id);
                            return;
                        }

                        if (project.tasksQuantity() === 0 && project.bugsQuantity() !== 0) {
                            this.fixProject(project.id);
                            return;
                        }
                }

            });

            return state;
        }
    },




};