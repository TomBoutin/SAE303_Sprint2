

class Event {
    #id;
    #summary;
    #description;
    #start;
    #end;
    #location;
    #person;
    #groups;
    #ressources;

    constructor(id, summary, description, start, end, location) {
        this.#id = id;
        this.#summary = summary.slice(0, summary.lastIndexOf(','));
        this.#description = description;
        this.#start = new Date(start);
        this.#end = new Date(end);
        this.#location = location;
        this.#ressources = summary.slice(summary.lastIndexOf(',') + 1);

        this.#groups = summary.slice(summary.lastIndexOf(',') + 1);
        this.#groups = this.#groups.split('.');
        this.#groups = this.#groups.map(gr => gr.replace(/\s/g, ""));

        const matchperson = this.#summary.match(/^.*\d (.*)/);
        this.#person = matchperson ? matchperson[1].toLowerCase() : null;
    }

    get id() {
        return this.#id;
    }

    get summary() {
        return this.#summary;
    }

    get description() {
        return this.#description;
    }

    get start() {
        return this.#start;
    }

    get end() {
        return this.#end;
    }

    get location() {
        return this.#location;
    }

    get groups() {
        return this.#groups.map(gr => gr); // retourne une copie du tableau
    }

    // retourne le type de l'événement (CM, TD, TP) en fonction du titre
    get type() {
        let typeEvent = ["CM", "TD", "TP"];
        let type = "Autre";
        for (let i = 0; i < typeEvent.length; i++) {
            if (this.#summary.includes(typeEvent[i])) {
                type = typeEvent[i];
            }
        }
        return type;

    }

    get hours() {
        if (this.#start && this.#end) {
            let startDate = this.#start;
            let endDate = this.#end;
            let timeDifference = endDate.getTime() - startDate.getTime();
            let hoursDifference = timeDifference / (1000 * 3600);

            return hoursDifference;
        } else {
            return null;
        }
    }


    get person() {
        return this.#person;
    }


    get semester() {
        let regex;
        if (this.#summary.startsWith('SAÉ')) {
            regex = /SAÉ\s(\d+)/;
        } else if (this.#summary.startsWith('R')) {
            regex = /R(\d+)/;
        } else {
            return 'Non spécifié';
        }

        let match = this.#summary.match(regex);
        if (match && match[1]) {
            return match[1];
        } else {
            return 'Non spécifié';
        }
    }

    get ressources() {
        let ressources = this.#summary.split(" ");
        let ressources2 = ressources[0] + " " + ressources[1];
        return ressources2;
    }

    

    // retourne un objet contenant les informations de l'événement
    // dans un format compatible avec Toast UI Calendar (voir https://nhn.github.io/tui.calendar/latest/EventObject)
    toObject() {
        return {
            id: this.#id,
            title: this.#summary,
            body: this.#description,
            start: this.#start,
            end: this.#end,
            location: this.#location,
            groups: this.#groups,
            type : this.type,
            person : this.person,
            ressources : this.ressources,
            hours : this.hours,
            semester : this.semester
        }
    }
}

export { Event };