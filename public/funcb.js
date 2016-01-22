/* global io */
/* global Vue */

//Role
var role = new Vue({
    el: '#role',
    data:{
        first: true
        }
});

// Cheese
var socket = io();
Vue.component('mark', {
    template: '<div class="cheese" v-on:click="mk()" v-bind:class="choose"></div>',
    methods: {
        mk: function(obj){
            this.choose.push('cheese_a');
            socket.emit('move', event.target.id);
        }
    },
    data: function () {
        return { 
            choose: []
         }
    }
});

var board = new Vue({
   el: '#board'
});

//Socket.Func

socket.on('step', function (data) {
    var cheese = document.getElementById(data);
   if(cheese.className=='cheese'){
        cheese.className += " " + 'cheese_b';
    }
});


