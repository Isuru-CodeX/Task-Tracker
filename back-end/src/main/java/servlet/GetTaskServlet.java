package servlet;

import com.google.gson.GsonBuilder;
import dao.TaskDAO;
import model.Task;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.IOException;

public class GetTaskServlet extends HttpServlet {

    private static final Gson GSON = new GsonBuilder()
            .setDateFormat("yyyy-MM-dd")
            .create();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        String idStr = req.getParameter("id");
        String userIdStr = req.getParameter("userId");

        if (idStr == null || idStr.trim().isEmpty() || userIdStr == null || userIdStr.trim().isEmpty()) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.setContentType("text/plain");
            resp.getWriter().write("Missing required query param: id or userId");
            return;
        }

        try {
            int id = Integer.parseInt(idStr);
            int userId = Integer.parseInt(userIdStr);

            Task task = new TaskDAO().getTaskById(id);

            if (task == null || task.getUserId() != userId) {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                resp.setContentType("text/plain");
                resp.getWriter().write("Task not found or access denied");
                return;
            }

            String json = GSON.toJson(task);

            resp.setContentType("application/json");
            resp.getWriter().write(json);
        } catch (NumberFormatException e) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.setContentType("text/plain");
            resp.getWriter().write("Invalid id or userId format");
        }
    }
}
