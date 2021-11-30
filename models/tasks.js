const Task = require("./task");

class Tasks {

    _list = {};

    constructor(list = []) {

        if (list?.length > 0) {

            list.forEach(task => this._list[task.id] = task);
        }
    }

    createTask(desc = '') {

        const task = new Task(desc);

        this._list[task.id] = task;
    }

    get tasksList() {
        return Object.values(this._list);
    }

    listedTasks() {
        console.log();

        if ( this.tasksList.length === 0 ) 
            return console.log('Nothing to show');

        this.tasksList.forEach((task, i) => {

            const idx = `${ i + 1 }.`.green;

            const { desc, completedAt } = task;

            const state = (completedAt) ? 'Completed'.green : 'Pending'.red

            console.log(`${ idx } ${ desc } ${ '::'.cyan } ${ state }`);
        });
    }

    printPendingCompletedTasks(completed = true) {
        console.log();

        const tasks = this.listPendingCompletedTasks(completed);

        if ( tasks.length === 0)
            return console.log('Nothing to show');

        tasks.forEach( ( task, i ) => {

            const idx = `${ i + 1 }.`.green;
            const { desc, completedAt } = task;

            const state = completedAt 
                            ? completedAt.toString().green 
                            : 'Pending'.red

            console.log(`${ idx } ${ desc } :: ${ state } `);

        });
    }

    listPendingCompletedTasks( completed = true ) {

        const tasks = [];

        this.tasksList.forEach(task => {

            const { completedAt } = task;

            if ( completed && !!completedAt ) {

                tasks.push(task);

            } else if ( !completed && !completedAt ) {

                tasks.push(task);
            }

        });

        return tasks;
    }

    deleteTask(id = '') {

        if ( this._list[id] ) {

            delete this._list[id];
        }
    }

    completeTask( id = '' ) {

        if ( this._list[id] && !this._list[id].completedAt ) {

            this._list[id].completedAt = new Date().toISOString();
        }
    }

    editCompletedTasks( ids = [] ) {

        for ( const id in this._list ) {

            this._list[ id ].completedAt = null;
        }

        ids.forEach( id => {

            this.completeTask( id );
        });
        
    } 
}

module.exports = Tasks;