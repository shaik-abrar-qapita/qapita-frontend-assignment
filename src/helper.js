export let taskColumns = [
  { name: "To-Do", status: "todo", bgColor: "lightcoral" },
  { name: "In-Progress", status: "progress", bgColor: "yellow" },
  { name: "Done", status: "done", bgColor: "lightgreen" },
];

export const countTasks = (tasks, status) => {
  let count = 0;

  for (let i = 0; i < tasks.length; i++) {
    const element = tasks[i];

    if (element.status === status) count++;
  }

  return count;
};

export const generateUniqueId = () => {
  // Generate a random string
  const randomStr = Math.random().toString(36).substr(2, 10);

  // Get current timestamp
  const timestamp = new Date().getTime().toString(36);

  // Concatenate random string and timestamp
  const uniqueId = randomStr + timestamp;

  console.log(uniqueId);

  return uniqueId;
};

export let api = [
  { taskId: 0, title: "Task1", desc: "Walking", status: "todo" },
  { taskId: 1, title: "Task2", desc: "Parking", status: "progress" },
  { taskId: 2, title: "Task3", desc: "Talking", status: "done" },
  { taskId: 3, title: "Task4", desc: "Caring", status: "todo" },
  { taskId: 4, title: "Task5", desc: "Cricket", status: "progress" },
  { taskId: 5, title: "Task6", desc: "Moving", status: "todo" },
  { taskId: 6, title: "Task7", desc: "Sharing", status: "done" },
  { taskId: 7, title: "Task5", desc: "Cricket", status: "progress" },
  { taskId: 8, title: "Task6", desc: "Moving", status: "todo" },
  { taskId: 9, title: "Task7", desc: "Sharing", status: "todo" },
];

export const getColorByStatus = (status) => {
  console.log(status);
  switch (status) {
    case "todo":
      return "lightcoral";
    case "progress":
      return "yellow";
    case "done":
      return "lightgreen";
    default:
      return "white"; // default color
  }
};
