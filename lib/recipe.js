import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

SimpleSchema.extendOptions(['autoform']);

Recipes = new Mongo.Collection('recipes');

Recipes.allow({
insert: function(userId,doc){
	return !!userId;
},
update: function(userId,doc){
	return !!userId;
}
});

Ingredient = new SimpleSchema({
	name : {
		type: String
	},
	quantity: {
		type: String
	}
});


RecipeSchema = new SimpleSchema({
	name : {
		type : String,
		label : "Name"
	},
	desc : {
		type : String,
		label : "Description"
	},

	ingredient: {
        type: Array,
				label: "Ingredients"
     },
     "ingredient.$": Ingredient,
  inMenu:{
     	type : Boolean,
     	defaultValue: false,
     	optional: true,
     	autoform: {
     		type: "hidden"
     	}
     },

	author : {
		type : String,
		label : "Author",
		autoValue: function(){
			return this.userId
		},
		autoform:{
			type : "hidden"
		}
	},
	createdAt : {
		type : Date,
		label : "Created At",
		autoValue: function(){
			return new Date()
		},
		autoform:{
			type : "hidden"
		}
	}
});

Meteor.methods({
	toggleMenuItem: function(id,currentState){
		Recipes.update(id, {
			$set: {
			 inMenu: !currentState
			}
		})
	},
	deleteRecipe: function(id){
		Recipes.remove(id)
	}

});

Recipes.attachSchema( RecipeSchema );
