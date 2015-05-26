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

var onSelectedNoteCb = function(id){
	notepad.selectedId = id;
	window.onChange();
};

var onDeletedNoteCb = function(id){
	notepad.notes = notepad.notes.filter((note) => {
		return note.id !== id;
	});
	notepad.selectedId = null;
	window.onChange();
};

var NoteSummary = React.createClass({
	render: function(){
		var content = this.props.note.content;
		return (
			<div className="note-summary">{content?content:"Empty Note"}</div>
		);        
	}
});


var NoteList = React.createClass({
	render: function () {
		var notepad = this.props.notepad;
		return (
			<div className="note-list">
				{
					notepad.notes.map((note)=>{
						return (
							<a href="#" className={note.id === notepad.selectedId?'note-selected':''}
										onClick={this.props.onSelectNote.bind(null, note.id)}>
								<NoteSummary note={note} />
							</a>
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
				<NoteList notepad={this.props.notepad} onSelectNote={this.props.onSelectedNote}/>
				<div>
					<button onClick={this.props.onAddNote} className="myButton">Add Note</button>
					{this.props.notepad.notes.length != 0 ? <button onClick={this.props.onDeletedNote.bind(null, this.props.notepad.selectedId)} className="myButton">Delete Note</button> : null}
				</div>
				{editor}
			</div>
		);
	}
});


var onChange = function(){
	React.render(
		<NotePad notepad={notepad} onAddNote={onAddNoteCb} onSelectedNote={onSelectedNoteCb} onChangeNote={onChangeNoteCb} onDeletedNote={onDeletedNoteCb} />, document.getElementById('contenido')
	);
}

window.onChange();