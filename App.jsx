App=React.createClass({
  mixins: [ReactMeteorData],
    getMeteorData() {

      return {acts: Rappers.find({}).fetch()}
    },

    renderTasks() {
    // Get tasks from this.data.tasks
    return this.data.acts.map((task) => {
      return <Task key={task._id} task={task} />;
    });
  },


    render(){
      return(
      <div>{this.renderTasks()}</div>

)
    }









})
