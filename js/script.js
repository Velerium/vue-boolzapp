Vue.config.devtools = true;

new Vue (
    {
        el: '#app',
        data: {
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Ricordati di dargli da mangiare.',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            text: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            text: 'Ciao, come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            text: 'Bene, grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            text: 'Mi piacerebbe, ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            text: 'La Marianna va in campagna.',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            text: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            text: 'Ah, scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Luisa',
                    avatar: '_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'S??, ma preferirei andare al cinema.',
                            status: 'received'
                        }
                    ],
                },
            ],

            lastMessageTimes: [
            ],

            findAvatar: '',
            recipientName: '',
            personIndex: 0,
            writingMessage: '',
            messageCounter: 0,
            filtro: '',
            onlineStatus: '',
            personAnswer: '',

        },

        created: function() {
            
            this.contacts.forEach((person, index) => {
                this.lastMessageTimes.push('');
                this.lastMessageTimes[index] = person.messages[person.messages.length - 1].date
            });
        },

        methods: {

            getAvatar: function(image) {
                return 'img/avatar' + image + '.jpg'
            },

            dataFind: function(index) {

                this.messageCounter = this.contacts[index].messages.length - 1;

                this.writingMessage = '';

                let x = this.contacts[index].avatar;
                this.findAvatar = this.getAvatar(x);

                this.recipientName = this.contacts[index].name;
                document.querySelector('.messages').style.display = 'flex';

                this.personIndex = index;

                this.updateTime();

                document.querySelector('#text-box').focus();

                this.hideDrop();
            },

            sentReceived: function(personIndex, index) {
                if (this.contacts[personIndex].messages[index].status === 'sent') {
                    return 'sent';
                } else if (this.contacts[personIndex].messages[index].status === 'received') {
                    return 'received';
                }
            },

            send: function() {

                if(this.writingMessage === '') {
                    return;
                }

                let message = {
                    date: this.getTime(),
                    text: this.writingMessage,
                    status: 'sent',
                }

                this.contacts[this.personIndex].messages.push(message);

                if (this.messageCounter === -1) {
                    this.messageCounter++;   // Prevents an error if chat is empty
                } else {

                    setTimeout(() => {
                        this.hideDrop();
                        document.querySelectorAll('.chat-messages')[this.messageCounter].scrollIntoView();
                    }, 0)
                    this.messageCounter++;
                }

                this.writingMessage = '';

                this.updateTime();

                this.answerGen();

            },

            messageErase: function(index) {
                
                
                this.contacts[this.personIndex].messages.splice(index, 1);
                this.messageCounter--;

                setTimeout (() => {
                    this.hideDrop();
                })

                this.updateTime();

            },

            search: function() {
                const people = document.getElementsByClassName('full');
                Array.from(people).forEach((person) => {
                    let user = person.children[1].firstChild.firstChild.textContent;
                    if (user.toLowerCase().includes(this.filtro.toLowerCase())) {
                        person.style.display = 'flex';
                    } else {
                        person.style.display = 'none';
                    }
                })           // Approccio indiretto, ma andr?? bene comunque :D
            },

            answerGen: function() {

                this.personAnswer = this.personIndex

                let x = Math.floor(Math.random() * 6);

                let answer = '';

                    switch (x) {
                        case 0:
                            answer = 'Certo!';
                            break;
                        case 1:
                            answer = 'Non ci credo!';
                            break;
                        case 2:
                            answer = 'Wow!';
                            break;
                        case 3:
                            answer = 'HAHHAHAHA';
                            break;
                        case 4:
                            answer = 'No, mi dispiace.';
                            break;
                        case 5:
                            answer = 'Okay.';
                            break;                            
                    }

                setTimeout (() => {
                    let reply = {
                        date: this.getTime(),
                        text: answer,
                        status: 'received',
                    };
                    this.contacts[this.personAnswer].messages.push(reply);
                    document.querySelectorAll('.chat-messages')[this.messageCounter].scrollIntoView();
                    this.messageCounter++;

                    this.updateTime();

                    this.hideDrop();

                }, 2000)

            },

            getTime: function() {
                return dayjs().format('DD/MM/YYYY HH:mm:ss')
            },

            updateTime: function() {

                let person = this.personIndex;

                if (this.contacts[person].messages.length === 0) {
                    this.lastMessageTimes[person] = '';
                    return;
                }

                if (this.contacts[person].messages[this.contacts[person].messages.length - 1].status === 'sent') {
                    this.onlineStatus = 'Online'
                } else {
                    this.onlineStatus = 'Ultimo accesso oggi alle: ';
                    this.lastMessageTimes[person] =
                    this.contacts[person].messages[this.contacts[person].messages.length - 1].date
                }

            },

            getLastMessage: function(index) {

                let messageNumber = this.contacts[index].messages;

                if (messageNumber.length === 0) {
                    return '';
                } else {
                    return messageNumber[messageNumber.length - 1].text;
                }
                
            },

            dropdownF: function(index) {
                
                let show = document.querySelectorAll('.dropdown-content');

                if (show[index] === undefined) {
                    return;
                }

                if (show[index].style.visibility === 'visible') {
                    this.hideDrop();
                } else if (show[index].style.visibility === '') {
                    this.hideDrop();
                    show[index].style.visibility = 'visible';
                }
            },

            hideDrop: function() {
                
                    let show = document.querySelectorAll('.dropdown-content');

                    for (x = 0; x < show.length; x++) {
                        show[x].style.visibility = '';
                    }
                
                
            }

        }

    }
)