var firebaseApp = require('./firebase-config')
var database = firebaseApp.database;
var PiMove = database.ref('/PiMove')

module.exports = {

    initialMovement: function ()
    {
        var postData = {
            up:false,
            down:false,
            left:false,
            right:false,
        }
        var updates = {};

        updates['Movement/'] = postData;
        return PiMove.update(updates);
    },

    updateUp: function(state)
    {
        var postData  = {
            up:state,
        }
        var updates = {};
    
        updates['Movement/'] = postData;
        return PiMove.update(updates);
    },

    updateDown: function(state)
    {
        var postData  = {
            down:state,
        }
        var updates = {};
    
        updates['Movement'] = postData;
        return PiMove.update(updates);
    },

    updateLeft: function(state)
    {
        var postData  = {
            left:state,
        }
        var updates = {};
    
        updates['Movement/'] = postData;
        return PiMove.update(updates);
    },
    updateRight: function(state)
    {
        var postData  = {
            right:state,
        }
        var updates = {};
    
        updates['Movement/'] = postData;
        return PiMove.update(updates);
    }

}