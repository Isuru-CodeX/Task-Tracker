import dao.TaskDAO;
import model.Task;
import java.util.List;
import java.util.Date;

public class Benchmark {
    public static void main(String[] args) {
        System.out.println("Starting Benchmark...");
        TaskDAO taskDAO = new TaskDAO();

        // Ensure some data exists - creating a dummy task
        // But we actually have an active DB. So let's insert if empty.

        List<Task> currentTasks = taskDAO.getTasksByUserId(3); // Based on database.sql, user 3 has task id 4
        if (currentTasks.isEmpty()) {
            System.out.println("No tasks found for user 3, benchmark may be invalid");
            return;
        }

        int iterations = 1000;

        // Warmup
        for (int i = 0; i < 100; i++) {
            taskDAO.getTasksByUserId(3);
            taskDAO.getTaskById(4);
        }

        long startList = System.nanoTime();
        for (int i = 0; i < iterations; i++) {
            List<Task> list = taskDAO.getTasksByUserId(3);
            // Simulate the original code's behavior: find the task in the list
            Task found = null;
            for (Task t : list) {
                if (t.getId() == 4) {
                    found = t;
                    break;
                }
            }
        }
        long endList = System.nanoTime();
        long avgListTime = (endList - startList) / iterations;
        System.out.println("Average time to fetch ALL tasks and filter: " + avgListTime + " ns");

        long startSingle = System.nanoTime();
        for (int i = 0; i < iterations; i++) {
            Task t = taskDAO.getTaskById(4);
            // Simulate checking if the task belongs to the user
            if (t != null && t.getUserId() == 3) {
                // Success
            }
        }
        long endSingle = System.nanoTime();
        long avgSingleTime = (endSingle - startSingle) / iterations;
        System.out.println("Average time to fetch SINGLE task by ID: " + avgSingleTime + " ns");

        if (avgSingleTime < avgListTime) {
            System.out.println(String.format("Performance Improvement: %.2fx faster", (double)avgListTime / avgSingleTime));
        }
    }
}
