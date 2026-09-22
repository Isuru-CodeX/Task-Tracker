package servlet;

import com.google.gson.GsonBuilder;
import dao.TaskDAO;
import model.Task;

import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.List;

public class GetTasksServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        String userIdStr = req.getParameter("userId");

        if (userIdStr == null || userIdStr.trim().isEmpty()) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.setContentType("text/plain");
            resp.getWriter().write("Missing required query param: userId");
            return;
        }

        int userId = Integer.parseInt(userIdStr);

        List<Task> tasks = new TaskDAO().getTasksByUserId(userId);

        String json = new GsonBuilder()
                .setDateFormat("yyyy-MM-dd")
                .create()
                .toJson(tasks);

        resp.setContentType("application/json");
        resp.getWriter().write(json);
    }
}
