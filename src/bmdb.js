var fs = require('fs');
var _ = require('lodash');
let util = require('util')
var exec = require('child_process').exec;
let exec_prom = util.promisify(exec)
var dbOptions =  {
    user: 'admin',
    pass: 'coconul',
    host: 'localhost',
    port: 27017,
    database: 'repuesto',
    autoBackup: true,
    removeOldBackup: true,
    keepLastDaysBackup: 3,
    autoBackupPath: 'C:\\Users\\development\\Documents\\backM\\'
};
/* return date object */
exports.stringToDate = function (dateString) {
    return new Date(dateString);
}



/* return if variable is empty or not. */
exports.empty = function(mixedVar) {
    var undef, key, i, len;
    var emptyValues = [undef, null, false, 0, '', '0'];
    for (i = 0, len = emptyValues.length; i < len; i++) {
        if (mixedVar === emptyValues[i]) {
        return true;
        }
    }
    if (typeof mixedVar === 'object') {
        for (key in mixedVar) {
return false;
        }
        return true;
    }
    return false;
};
// Auto backup script
exports.dbAutoBackUp = async function (createdBY,location) {
// check for auto backup is enabled or disabled

/* aqui se retorna un done KLK*/
var done = false;

  if (createdBY === "System") {
    //console.log("entra if");
    if (dbOptions.autoBackup == true) {
        var date = new Date();
        var beforeDate, oldBackupDir, oldBackupPath;
        currentDate = this.stringToDate(date); // Current date
        var newBackupDir = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
        var newBackupPath = dbOptions.autoBackupPath + 'mongodump-' + newBackupDir; // New backup path for current backup process
        // check for remove old backup after keeping # of days given in configuration
        if (dbOptions.removeOldBackup == true) {
            beforeDate = _.clone(currentDate);
            beforeDate.setDate(beforeDate.getDate() - dbOptions.keepLastDaysBackup); // Substract number of days to keep backup and remove old backup
            oldBackupDir = beforeDate.getFullYear() + '-' + (beforeDate.getMonth() + 1) + '-' + beforeDate.getDate();
            oldBackupPath = dbOptions.autoBackupPath + 'mongodump-' + oldBackupDir; // old backup(after keeping # of days)
        }
        var cmd = ' "C:\\Program Files\\MongoDB\\Server\\4.0\\bin\\mongodump.exe" --host ' + dbOptions.host + ' --authenticationDatabase "admin" --port ' + dbOptions.port +  ' --username ' + dbOptions.user + ' --password ' + dbOptions.pass + ' --out ' + '"'+newBackupPath+'"'; // Command for mongodb dump process

        await exec_prom(cmd).then((error)=>{
          if (!this.empty(error)) {
              // check for remove old backup after keeping # of days given in configuration
              done = true;
              //console.log("pass exec");
            if (dbOptions.removeOldBackup == true) {
                  if (fs.existsSync(oldBackupPath)) {
                      exec("rm -rf " + oldBackupPath, function (err) { });
                  }
              }

          }else {
            console.log(error);
            done = false;
          }
          //console.log('done exec')
        });
        // await exec_prom(cmd);
        /*await exec_prom(cmd, await function (error, stdout, stderr) {
            if (error === null) {
                // check for remove old backup after keeping # of days given in configuration
                done = true;
                console.log("pass exec");
              if (dbOptions.removeOldBackup == true) {
                    if (fs.existsSync(oldBackupPath)) {
                        exec("rm -rf " + oldBackupPath, function (err) { });
                    }
                }

            }else {
              console.log(error);
              done = false;
            }
        });*/
    }

  }else {
    var date = new Date();
    currentDate = this.stringToDate(date); // Current date
    var newBackupDir = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
    var newBackupPath = location + 'mongodump-' + newBackupDir; // New backup path for current backup process

    var cmd = '"C:\\Program Files\\MongoDB\\Server\\4.0\\bin\\mongodump.exe" --host ' + dbOptions.host + ' --authenticationDatabase "admin" --port ' + dbOptions.port +  ' --username ' + dbOptions.user + ' --password ' + dbOptions.pass + ' --out ' + '"'+newBackupPath+'"'; // Command for mongodb dump process
    await exec_prom(cmd).then( (error) => {
        if (fs.existsSync(newBackupPath)) {
            done = true;
        }else {
          console.log(error);
          done = false;
        }
    });

  }
  //console.log("envia retorno");
  return done;
}
