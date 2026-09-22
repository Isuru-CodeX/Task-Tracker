package servlet;

import com.google.gson.Gson;
import dao.TaskDAO;
import model.Task;

import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.IOException;

public class AddTaskServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        Task task = new Gson().fromJson(req.getReader(), Task.class);

        task.setCreatedDate(new java.sql.Date(System.currentTimeMillis()));

        new TaskDAO().saveTask(task);

        resp.setStatus(HttpServletResponse.SC_CREATED);
    }
}
