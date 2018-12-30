import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import '../lib/recipe.js';
import '../lib/router.js';
import '../client/layouts/homeLayout.html';
import '../client/layouts/mainLayout.html';
import '../client/layouts/recipes.html';
import '../client/layouts/menu.html';
import '../client/layouts/shopping-list.html';
import './main.html';

//Meteor.subscribe('recipes');


Template.Recipes.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('recipes');
	});
});

Template.Recipes.helpers({
	 recipes(){
	 	return Recipes.find({});
	 }
});


Template.Recipes.events({
	'click .new-recipe'(){
		Session.set('addnew',true)
	},
	'click .fa-close'(){
		Session.set('addnew',false)
	}
});

Template.Recipe.onCreated(function(){
	this.EditMode = new ReactiveVar(false);
});
Template.Recipe.helpers({
		updateRecipeId(){
			return this._id;
		},
		EditMode(){
			return Template.instance().EditMode.get();
		}
});

Template.Recipe.events({
	'click .toggle-menu'(){
		 Meteor.call('toggleMenuItem',this._id,this.inMenu);
	},
	'click .fa-trash'(){
		Meteor.call('deleteRecipe',this._id);
	},
	'click .fa-pencil'(event, template){
	 template.EditMode.set(!template.EditMode.get())
	}
});


Template.recipeSingle.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('recipes');
	});
});

Template.recipeSingle.helpers({
	 recipe(){
	 	var id = FlowRouter.getParam('id');
	 	return Recipes.findOne({_id:id});
	 }
});

Template.Menu.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('recipes');
	});
});

Template.Menu.helpers({
	 recipes(){
	 	return Recipes.find({inMenu: true});
	 }
});


Template.shoppingList.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('recipes');
	});
});

Template.shoppingList.helpers({
	 shoppinglist(){
	 	return Recipes.find({inMenu: true});
	 }
});
