package dao;

import model.Task;
import org.hibernate.Session;
import config.HibernateUtil;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public class TaskDAOPerformanceTest {

    public static void main(String[] args) {
        TaskDAO dao = new TaskDAO();
        int numTasks = 1000;

        // 1. Set up data
        List<Integer> taskIds = new ArrayList<>();
        System.out.println("Setting up " + numTasks + " tasks...");

        for (int i = 0; i < numTasks; i++) {
            Task task = new Task();
            task.setTitle("Perf Task " + i);
            task.setDescription("Description " + i);
            task.setCreatedDate(new Date(System.currentTimeMillis()));
            task.setUserId(1);
            dao.saveTask(task);
            taskIds.add(task.getId());
        }

        // 2. Measure deletion performance
        System.out.println("Starting deletion test...");
        long startTime = System.currentTimeMillis();

        for (int id : taskIds) {
            dao.deleteTask(id);
        }

        long endTime = System.currentTimeMillis();
        System.out.println("Total time to delete " + numTasks + " tasks: " + (endTime - startTime) + " ms");
        System.out.println("Average time per deletion: " + (double)(endTime - startTime) / numTasks + " ms");

        System.exit(0);
    }
}
