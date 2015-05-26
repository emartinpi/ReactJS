var notepad = {
	notes: [],
	selectedId: null
};
var nextNodeId = 1;

var onAddNoteCb = function(){
	var note = {id: nextNodeId++, content: ""};
	notepad.notes.push(note);
	notepad.selectedId = note.id;
	window.onChange();
};

var onChangeNoteCb = function(id, value){
	var note = notepad.notes.find(function(note){
		return note.id === id;
	});

	if (note) 
		note.content = value;

	window.onChange();
};
React
var NoteSummary = .createClass({
	render: function(){
		var content = this.props.note.content;
		return (
			<div className="note-summary">{content?content:"Empty Note"}</div>
		);        
	}
});


var NoteList = React.createClass({
	render: function () {
		return (
			<div className="note-list">
				{
					this.props.notepad.notes.map(function(note){
						return (
							<NoteSummary note={note} />
						);
					})
				}
			</div> 
		);
	}
});

var NoteEditor = React.createClass({
	onChangeTextArea: function (e) {
		this.props.onChange(notepad.selectedId, e.target.value);
	},

	//llamado despues de que el elemento es renderizado la primera vez
	componentDidMount: function(){
		//document.getElementById("inputNote").focus();
	},

	render: function(){
		return (
			<input id="inputNote" className="css-input" value={this.props.note.content} onChange={this.onChangeTextArea}/>
		);
	}
});


var NotePad = React.createClass({
	render: function(){

		var editor = null;
		
		var selectedNote = notepad.notes.find(function(note){
			return note.id === notepad.selectedId;
		});

		if (selectedNote)
			editor = <NoteEditor note={selectedNote} onChange={this.props.onChangeNote}/>;

		return (
			<div id="notepad">
				<NoteList notepad={this.props.notepad}/>
				<div><button onClick={this.props.onAddNote} className="myButton">Add Note</button></div>
				{editor}
			</div>
		);
	}
});


var onChange = function(){
	React.render(
		<NotePad notepad={notepad} onAddNote={onAddNoteCb} onChangeNote={onChangeNoteCb} />, document.getElementById('contenido')
	);
}

window.onChange();