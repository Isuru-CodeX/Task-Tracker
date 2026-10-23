import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;

class Task {
    public int id;
    public String title;
    public String description;
    public Date dueDate;
    public boolean completed;
    public int userId;

    public Task(int id, String title, String description, Date dueDate, boolean completed, int userId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.completed = completed;
        this.userId = userId;
    }
}

public class GsonBenchmark {
    public static void main(String[] args) {
        List<Task> tasks = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            tasks.add(new Task(i, "Task " + i, "Description " + i, new Date(), false, 1));
        }

        int iterations = 100000;

        // Warmup
        for (int i = 0; i < 10000; i++) {
            new GsonBuilder().setDateFormat("yyyy-MM-dd").create().toJson(tasks);
        }

        long start = System.nanoTime();
        for (int i = 0; i < iterations; i++) {
            new GsonBuilder().setDateFormat("yyyy-MM-dd").create().toJson(tasks);
        }
        long end = System.nanoTime();
        System.out.println("Unoptimized (new GsonBuilder): " + (end - start) / 1_000_000 + " ms");

        Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();

        // Warmup
        for (int i = 0; i < 10000; i++) {
            gson.toJson(tasks);
        }

        start = System.nanoTime();
        for (int i = 0; i < iterations; i++) {
            gson.toJson(tasks);
        }
        end = System.nanoTime();
        System.out.println("Optimized (reused Gson): " + (end - start) / 1_000_000 + " ms");
    }
}
