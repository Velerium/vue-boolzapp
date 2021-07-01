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
                    name: 'Muisa',
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
                            text: 'Sì, ma preferirei andare al cinema.',
                            status: 'received'
                        }
                    ],
                },
            ],

            findAvatar: '',
            recipientName: '',
            personIndex: 0,
            writingMessage: '',
            messageCounter: 2,
            filter: '',

        },

        methods: {
            getAvatar: function(image) {
                return 'img/avatar' + image + '.jpg'
            },

            dataFind: function(index) {

                this.writingMessage = '';

                let x = this.contacts[index].avatar;
                this.findAvatar = this.getAvatar(x);

                this.recipientName = this.contacts[index].name;
                document.querySelector('.messages').style.display = 'flex';

                this.personIndex = index;

                document.querySelector('#text-box').focus();
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
                    date: 'No idea how to set the time.',
                    text: this.writingMessage,
                    status: 'sent',
                }

                this.contacts[this.personIndex].messages.push(message)
                document.querySelectorAll('.chat-messages')[this.messageCounter].scrollIntoView();
                this.messageCounter++;

                this.writingMessage = '';

                let returnMessage = this.answerGen();

                setTimeout (() => {
                    let answer = {
                        date: 'No idea how to set the time.',
                        text: returnMessage,
                        status: 'received',
                    };
                    this.contacts[this.personIndex].messages.push(answer);
                    document.querySelectorAll('.chat-messages')[this.messageCounter].scrollIntoView();
                    this.messageCounter++;

                }, 1000)
            },

            search: function() {
                this.contacts.forEach(person => {
                    if (person.name[0] !== this.filter[0]) {
                        return 'hide';
                    }
                });
            },

            answerGen: function() {
                let x = Math.floor(Math.random() * 6);
                    switch (x) {
                        case 0:
                            return 'Certo!';
                        case 1:
                            return 'Non ci credo!';
                        case 2:
                            return 'Wow!';
                        case 3:
                            return 'HAHHAHAHA';
                        case 4:
                            return 'No, mi dispiace.';
                        case 5:
                            return 'Okay.';                            
                    }
            },
        },

    }
)