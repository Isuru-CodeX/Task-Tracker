const formatDate = (value) => {
    if (!value) return "";
    const normalized = value.replace(" ", "T").replace(".0", "");
    const d = new Date(normalized);
    if (isNaN(d.getTime())) return value;

    return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

const tasks = Array.from({length: 10000}, (_, i) => ({
    id: i,
    title: "Task " + i,
    description: "Description " + i,
    createdDate: "2023-10-12 12:00:00.0"
}));

// Simulate 10 renders (e.g. scrolling/updates)
console.time("Baseline Render (10 renders of 10000 items)");
for (let r = 0; r < 10; r++) {
    for (let i = 0; i < tasks.length; i++) {
        const _ = formatDate(tasks[i].createdDate);
    }
}
console.timeEnd("Baseline Render (10 renders of 10000 items)");

// Optimized: 1 load, 10 renders
console.time("Optimized Total (1 load + 10 renders)");
const optimizedTasks = tasks.map(t => ({...t, formattedDate: formatDate(t.createdDate)}));
for (let r = 0; r < 10; r++) {
    for (let i = 0; i < optimizedTasks.length; i++) {
        const _ = optimizedTasks[i].formattedDate;
    }
}
console.timeEnd("Optimized Total (1 load + 10 renders)");
