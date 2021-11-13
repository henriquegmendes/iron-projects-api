class TasksRepository {
  constructor(model) {
    this.taskModel = model;
  }

  async getTasksByProjectId(projectId) {
    const tasks = await this.taskModel.find({ project: projectId });

    return tasks;
  }

  async createNewTask(newTask) {
    const savedTask = await this.taskModel.create(newTask);

    return savedTask;
  }
}

export default TasksRepository;
