
const Event = require('../../models/event');
const { dateToString } = require('../../helpers/date');
const { transformEvent } = require('./merge')



module.exports = {
    events: () => {
        return Event.find()
            .then(events => {
                return events.map(event => {
                    return transformEvent(event);
                });
            })
            .catch(err => {
                throw err
            });
    },

    createEvent: (args, req) => {
        if (!req.isAuth) {
            throw new Error("User is not loged in!");
        }
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '5c8242506de2eb25b0a1167a'
        })
        let createdEvent;
        return event.save().then(result => {
            createdEvent = {
                ...result._doc,
                _id: result._doc._id.toString(),
                date: dateToString(event._doc.date),
                creator: user.bind(this, result._doc.creator)
            };
            return User.findById('5c8242506de2eb25b0a1167a')
        })
            .then(user => {
                if (!user) {
                    throw new Error('User not found!')
                }
                user.createdEvents.push(event);
                return user.save();
            })
            .then(result => {
                return createdEvent;
            })
            .catch(err => {
                console.log(err)
                throw err
            })
    }
}  