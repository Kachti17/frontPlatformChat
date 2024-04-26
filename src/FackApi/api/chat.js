import User from '../../Model/User'
import Message from '../../Model/Message'

export const Users = [
  new User({ id: 1, name: 'Team Discussions', role: 'Lorem Ipsum is', isPrivate: true, image: require('@/assets/images/user/user-1.jpg'), isActive: true }),

  new User({ id: 5, name: 'Testing Team', role: 'Lorem Ipsum used', image: require('../../assets/images/user/user-5.jpg'), isActive: false }),

]

export const MessagesUser1 = [
  new Message({ text: 'How can we help? We\'re here for you! 😄', userId: 5, me: true, time: '6:45' }),
  new Message({ text: 'Hey John, I am looking for the best admin template. Could you please help me to find it out?🤔', userId: 15, me: false, time: '6:48' }),
]

export const MessagesUser2 = [
  new Message(),
  new Message(),

]


