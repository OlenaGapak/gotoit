export const public_relations = {
    forum_thread: {
        name: "Start a forum thread",
        long: 24,
        cost: 0,
        tooltip: "Tell the whole Internet about your company and projects. Who knows? Maybe it`ll help, but surely not for long",
        onClick: state => {
            state.on_tick_effects.push({
                type: "forum_thread",
                start_tick: state.date.tick
            });
        },
        onTickByDelta: (state, delta, n) => {
            state.reputation += (Math.cbrt(delta) / delta) * 2 * (2 / n); // + 12.3
            state.rumor += (Math.cbrt(delta) / delta) * (2 / n); // + 24.59
        }
    },
    search_specialist: {
        name: "Search market for a specialist",
        long: 24 * 7,
        cost: 1000,
        tooltip:
            "Preaching and advertising your company at the most popular hiring web sites",
        onClick: state => {
            state.money -= 1000;
            state.statistics.public_relations_costs.buffer += 1000;
            state.on_tick_effects.push({
                type: "search_specialist",
                start_tick: state.date.tick
            });
        },
        onTickByDelta: (state, delta, n) => {
            let customDelta = delta * 0.03;
            state.rumor += ((1 + Math.sin(customDelta - Math.PI / 2)) / 2) * (2 / n); //+ 199.2
            if (delta < 24) {
                state.reputation += (Math.cbrt(delta) / delta) * 2 * (2 / n); //+ 24.5
            }
        }
    },
    search_job: {
        name: "Search market for a job",
        long: 24 * 7,
        cost: 500,
        tooltip:
            "Using contemporary sales CRM systems and public activity to increase interest in your company",
        onClick: state => {
            state.money -= 500;
            state.statistics.public_relations_costs.buffer += 500;
            state.on_tick_effects.push({
                type: "search_job",
                start_tick: state.date.tick
            });
        },
        onTickByDelta: (state, delta, n) => {
            let customDelta = delta * 0.03;
            state.reputation += ((1 + Math.sin(customDelta - Math.PI / 2)) / 2) * (2 / n); //+ 199.2
            if (delta < 24) {
                state.rumor += (Math.cbrt(delta) / delta) * 2 * (2 / n); //+ 24.5
            }
        }
    },
    big_event: {
        name: "Attend big IT event",
        long: 24 * 7 * 2,
        cost: 2500,
        tooltip: "Lots of money and time spend. Lots of media coverage afterwards.",
        onClick: state => {
            state.money -= 2500;
            state.statistics.public_relations_costs.buffer += 2500;
            state.on_tick_effects.push({
                type: "big_event",
                start_tick: state.date.tick
            });
        },
        onTickByDelta: (state, delta, n) => {
            let customDelta = delta * 0.03;
            state.reputation += (1 + Math.sin(customDelta - Math.PI / 2)) * 2;
            state.rumor += (1 + Math.sin(customDelta - Math.PI / 2)) / n;
        }
    }
};
