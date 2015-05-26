var notepad = {
	notes: [
	{
		id: 1,
		content: "¡Hola, mundo! \nUno.\nDos.\nTres."
	},
	{
		id: 2,
		content: "React es sorprendente.\nEn serio, es el más grande."
	},
	{
		id: 3,
		content: "Los robots son muy divertidos.\nLos Robots son magníficos, hasta que empiezan a pensar por su cuenta."
	},
	{
		id: 4,
		content: "Claudio.\nYo Claudio, excelente serie de TV."
	}
	]
};

var NoteSummary = React.createClass({
	render: function(){
		return (
			<div className="note-summary">{this.props.note.content}</div>
		);        
	}
});

var Notelist = React.createClass({
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

React.render(
	<Notelist notepad={notepad} />, document.getElementById('contenido')
);