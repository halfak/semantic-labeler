(function($, OO){

  /**
   * Basically just a drop-down box and a button
   *
   */
  OO.ui.SemanticOperationsSelector = function(opts){
    var meanings = opts.meanings;
    var objects = opts.objects;
    var actions = opts.actions;

    this.$element = $("<div>").addClass("semantic-operations-selector");

    this.semanticMeanings = new OO.ui.SemanticMeaningSelector({
      meanings: meanings
    });
    this.semanticMeanings.on("add", this.handleSemanticMeaningAdd.bind(this));

    this.semanticMap = {};
    this.$workspace = $("<div>").addClass("workspace");
    this.$element.append(this.$workspace);
  };
  OO.inheritClass( OO.ui.SemanticOperationsSelector, OO.ui.Widget );
  OO.ui.SemanticOperationsSelector.prototype.handleSemanticMeaningAdd = function(){
    var meaning = this.semanticMeanings.getData();

    if ( meaning === undefined ) {
      // TODO: consider alerting
      throw "No meaning selected";
    }else if ( this.semanticMap[meaning] !== undefined ){
      throw "Meaning " + meaning + " already selected";
    }else{
      var operationsSelector = new OO.ui.SyntacticOperationsSelector({
        label: meaning,
        objects: objects,
        actions: actions
      });
      this.semanticMap[meaning] = operationsSelector;
      this.$workspace.append(operationsSelector.$element);
      operationsSelector.on('close', this.handleCloseSelector.bind(this));
    }

    this.semanticMeanings.reset();
  };
  OO.ui.SemanticOperationsSelector.prototype.handleCloseSelector = function(){
    //TODO: remove the select from semanticMap
  };

  /**
   * Basically just a drop-down box and a button
   *
   */
  OO.ui.SemanticMeaningSelector = function(opts){
    var label = opts.label;
    var meanings = opts.meanings;
    var button_label = opts.button_label;

    this.$element = $("<div>").addClass("semantic-meaning-selector");

    // Menu elements
    items = [];
    for(var i=0; i < meanings.length; i++){
      var meaning = meanings[i];
      items.push(
        new OO.ui.MenuOptionWidget({ data: meaning, label: meaning })
      );
    }

    this.dropdown = new OO.ui.DropDownWidget( {
      label: label,
      menu: {items: items}
    } );
    this.$element.append(this.dropdown.$element);

    this.button = new OO.ui.ButtonWidget( {
        label: button_label,
        icon: 'add'
    } );
    this.$element.append(this.button.$element);
    this.button.on('click', this.handleButtonClick.bind(this));

  };
  OO.inheritClass( SemanticMeaningSelector, OO.ui.Widget );
  OO.ui.SemanticMeaningSelector.prototype.handleButtonClick = function(){
    this.emit('add', [this.dropdown.menu.getSelectedItem().getData()]);
  };
  OO.ui.SemanticMeaningSelector.prototype.reset = function(){
    //TODO: reset the dropdown
  };

  /**
   * Contains a semantic meaning -- allows the selection of syntactic
   * operations
   *
   */
  OO.ui.SyntacticOperationsSelector = function(opts){
    var label = opts.label;
    var objects = opts.objects;
    var actions = opts.actions;

    this.$element = $("<div>").addClass("syntactic-operations-selector");

    this.closer = new OO.ui.ButtonWidget({label: "X", classes: ["closer"]});
    this.$element.append(this.closer.$element);
    this.closer.on('click', this.handleCloserClick.bind(this));

    this.$title = $("<div>").addClass("title").text(label);

    this.objectActions = new ObjectActionSelector({
      objects: objects,
      actions: actions
    });
    this.$element.append(this.objectActions.$element);

    this.objectActionMap = {};
    this.$workspace = $("<div>").addClass("workspace");
    this.$element.append(this.$workspace);
  };
  OO.inheritClass( OO.ui.SyntacticOperationsSelector, OO.ui.Widget );
  OO.ui.SyntacticOperationsSelector.prototupe.handleObjectActionAdd = function(){
    //TODO: check if we already have an instance of this object/action pair
    // if we don't, add it to the workspace
    var key = objectAction.object + "-" + objectAction.action;
    if(self.objectActionMap[key] !== undefined){
      var data = this.objectActions.getData();
      var soa = SyntacticObjectAction({
        object: data.object,
        action: data.action
      });
      this.$workspace.append(soa.$element);
      self.objectActionMap[key] = soa;
    }else{
      alert("'" + key + "' has already been added.");
    }

  };
  OO.ui.SyntacticOperationsSelector.prototupe.handleObjectActionClose = function(soa){
    //remove from objectActionMap
    var key = soa.object + "-" + soa.action;
    delete self.objectActionMap[key];
  };
  OO.ui.SyntacticOperationsSelector.prototupe.handleCloserClick = function(){
    //destroy the object and emit an event
    self.$element.remove();
    self.emit('close', [this]);
  };

  OO.ui.SyntacticObjectAction = function(opts){
    this.object = opts.object;
    this.action = opts.action;

    this.$element = $("<div>").addClass("object-action");

    this.$object = $("<div>").addClass("object").text(this.object);
    this.$element.append(this.$object);
    this.$action = $("<div>").addClass("object").text(this.action);
    this.$element.append(this.$action);

    this.closer = new OO.ui.ButtonWidget({label: "X", classes: ["closer"]});
    this.$element.append(this.closer.$element);
    this.closer.on('click', this.handleCloserClick.bind(this));
  };
  OO.ui.SyntacticObjectAction.prototype.handleCloserClick = function(){
    // TODO: Destroy self and emit an event
    self.$element.remove();
    self.emit('close', [this]);
  };

})(jQuery, OO);
