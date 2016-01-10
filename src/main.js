import Vue from 'vue';
import Member from './components/Member.vue';
import PageHeader from './components/PageHeader.vue';
import Firebase from 'firebase';
import moment from 'moment';
import {getCurrentCoords} from './utility/location';

moment.locale('it');

const fire = new Firebase('https://ppkrew.firebaseio.com');
let members = [];

fire.child('members').on('child_added', snapshot => {
  const member = snapshot.val();
  member.id = snapshot.key();
  members.unshift(member);
});

fire.child('members').on('child_removed', snapshot => {
  const id = snapshot.key()
  members.some(member => {
    if (member.id === id) {
      members.$remove(member);
      return true;
    }
  });
});

fire.child('members').on('child_changed', snapshot => {
  const memberChanged = snapshot.val()
  memberChanged.id = snapshot.key()

  members.some((member, index) => {
    if (member.id === memberChanged.id) {
      members.$set(index, memberChanged);
      return true;
    }
  });
});

new Vue({
  el: '#app',

  components: {
    PageHeader,
    Member,
  },

  data: {
    members,
  },

  events: {
    'kick-out-member'(member) {
      fire.child('members/' + member.id).remove();
    },

    'new-member-joined'(member) {
      const newMemberRef = fire.child('members').push(Vue.util.extend(member, {
        createdAt: Firebase.ServerValue.TIMESTAMP
      }));
      getCurrentCoords().then(coords => {
        newMemberRef.once('value', snapshot => {
          if (snapshot.exists()) {
            newMemberRef.child('coords').set(coords);
          }
        });
      });
    },
  },
});
