<template>
    <div class="col-lg-6 offset-lg-3">

        <div v-if="ready">
            <p v-for="user in info">
                {{user.username}} {{user.type}}
            </p>
        </div>


        <h2 v-else>{{username}}</h2>
        <div class="card bg-info" v-if="ready">
            <div class="card-header text-white">
                <h4>My Chat App <span class="float-right">{{connections}} connections</span></h4>
            </div>
            <ul class="list-group list-group-flush text-right">
                <small v-if="typing" class="text-white">{{typing}} is typing</small>
                <li class="list-group-item" v-for="message in messages">
                            <span :class="{'float-left':message.type === 1}">
                                {{message.message}}
                                <small>:{{message.user}}</small>
                            </span>
                </li>
            </ul>

            <div class="card-body">
                <form @submit.prevent="send">
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="newMessage"
                               placeholder="Enter message here">
                        <input type="text" class="form-control" v-model="toUser"
                               placeholder="User">
                        <input type="submit" value="Send" class="btn btn-sm btn-info ml-1">
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

    import io from 'socket.io-client';
    const socket = io(process.env.SOCKET);

    export  default  {
        data () {
            return {
                newMessage: null,
                toUser: null,
                messages: [],
                typing: false,
                username: localStorage.getItem('email'),
                ready: false,
                info: [],
                connections: 0,
            }
        },


        // Our vue created method
        created() {

            socket.emit('add-user', localStorage.getItem('email'))

            this.ready = true;

            // Emitting 'leave' event on tab closed event.
            window.onbeforeunload = () => {
                socket.emit('leave', this.username);
            }

            // Listening to chat-message event emitted from the server and pushing to messages array
            socket.on('chat-message', (data) => {
                this.messages.push({
                    message: data.message,
                    type: 1,
                    user: data.user,
                });
            });


            // Listening to typing event emitted from the server and setting the data (username) to the UI
            socket.on('typing', (data) => {
                this.typing = data;
            });
            // Listening to stopTyping event emitted from the server and setting the typing property to false
            socket.on('stopTyping', () => {
                this.typing = false;
            });
            // Listening to 'joined' event emitted from the server and pushing the data to info array
            socket.on('joined', (data) => {
                this.info.push({
                    username: data,
                    type: 'joined'
                });
                // Setting a time out for the info array to be emptied
                setTimeout(() => {
                    this.info = [];
                }, 5000);
            });
            // Listening to 'leave' event emitted from the server and pushing the data to info array
            socket.on('leave', (data) => {
                this.info.push({
                    username: data,
                    type: 'left'
                });

                // Setting a time out for the info array to be emptied
                setTimeout(() => {
                    this.info = [];
                }, 5000);
            });
            // Listening to 'connections' event emitted from the server to get the total number of connected clients
            socket.on('connections', (data) => {
                this.connections = data;
            });
        },
        // Vue Watch hook
        watch: {

            // Watching for changes in the message inbox box and emitting the either 'typing' or 'stopTyping' event
            newMessage(value) {
                value ? socket.emit('typing', localStorage.getItem('email')) : socket.emit('stopTyping')
            }
        },
        //Vue Methods hook
        methods: {

            //The send method stores the user message and emit an event to the server.
            send() {
            this.ready = true;
                this.messages.push({
                    message: this.newMessage,
                    type: 0,
                    user: localStorage.getItem('email'),
                });

                //for chat
                // socket.emit('chat-message', {
                //     message: this.newMessage,
                //     user: this.username
                // });

                //for private
                socket.emit('private-message', {
                    message: this.newMessage,
                    user:  localStorage.getItem('email'),
                    toUser: this.toUser,
                    token: localStorage.getItem('token')
                });

                console.log(this.username);

                this.newMessage = null;
            },

        },
    };
</script>
