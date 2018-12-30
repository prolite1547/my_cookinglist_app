if(Meteor.isClient){
 Accounts.onLogin(function() {
   FlowRouter.go('cook-book');
});

 Accounts.onLogout(function() {
 	FlowRouter.go('home');
  Session.set('addnew',false);
  
});

}

FlowRouter.triggers.enter([function(context,redirect){
	if(!Meteor.userId()){
		FlowRouter.go('home');
	}
}]);

FlowRouter.route('/', {
	name : 'home',
	action(){
		if(Meteor.userId()){
			FlowRouter.go('cook-book');
		}
		BlazeLayout.render('homeLayout');
	}
});

FlowRouter.route('/cook-book', {
	name : 'cook-book',
	action(){
		BlazeLayout.render('mainLayout', {main: 'Recipes'});
	}
});

FlowRouter.route('/recipe/:id', {
	name : 'recipe',
	action(){
		BlazeLayout.render('mainLayout', {main: 'recipeSingle'});
	}
});

FlowRouter.route('/menu', {
	name : 'menu',
	action(){
		BlazeLayout.render('mainLayout', {main: 'Menu'});
	}
});

FlowRouter.route('/shopping-list', {
	name : 'shopping-list',
	action(){
		BlazeLayout.render('mainLayout', {main: 'shoppingList'});
	}
});
