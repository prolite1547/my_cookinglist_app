import { Meteor } from 'meteor/meteor';


import '../lib/recipe.js';


Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('recipes',function(){
	return Recipes.find({author: this.userId});
});

 