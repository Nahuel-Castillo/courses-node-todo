// const { showMenu, pause } = require('./helpers/messages');

require('colors');

const { 
    inquirerMenu, 
    pause,
    readInput,
    listTasks,
    confirm,
    listCheckTasks
} = require('../05-weather-app/helpers/inquirer'); 

const Tasks = require('./models/tasks');
const { saveDB, readDB } = require('./helpers/fileDBController');

const main = async() => {

    let opt = 0;
    const tasks = new Tasks(  readDB() );

    do {
        opt = await inquirerMenu();

        switch ( opt ) {
            case 1:
                const desc = await readInput('Description:');
                tasks.createTask( desc );   
                break;

            case 2:
                tasks.listedTasks();
                break;

            case 3:
                tasks.printPendingCompletedTasks()
                break;
                
            case 4:
                tasks.printPendingCompletedTasks( false )
                break;
                
            case 5:
                if ( tasks.tasksList.length === 0 ) { 
                    console.log( '\nNothing to show');
                    break;
                }

                const selectedTasks = await listCheckTasks( tasks.tasksList );
                
                tasks.editCompletedTasks( selectedTasks );

                break;

            case 6:
                if ( tasks.tasksList.length === 0 ) { 
                    console.log( '\nNothing to show');
                    break;
                }

                const id = await listTasks( tasks.tasksList ); 

                if ( id !== '0' && await confirm( 'Are you sure?' ) ) {
                    tasks.deleteTask( id );
                    console.log('Task deleted');
                }

                break;

            default:
                break;
                
        }
            
        saveDB( tasks.tasksList );
        // console.log( opt );

        console.log('\n');

        if ( opt !== 0 ) await pause();

        console.clear();
    } while ( opt !== 0);


}

main();