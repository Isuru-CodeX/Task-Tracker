package servlet;

import com.google.gson.Gson;
import dao.TaskDAO;
import model.Task;

import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.IOException;

public class UpdateTaskServlet extends HttpServlet {

    static class UpdatePayload {
        int id;
        int userId;
        String title;
        String description;
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        UpdatePayload payload = new Gson().fromJson(req.getReader(), UpdatePayload.class);

        TaskDAO dao = new TaskDAO();
        Task existing = dao.getTaskById(payload.id);

        if (existing == null) {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return;
        }

        if (existing.getUserId() != payload.userId) {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            resp.getWriter().write("Not allowed");
            return;
        }

        existing.setTitle(payload.title);
        existing.setDescription(payload.description);

        dao.updateTask(existing);

        resp.setStatus(HttpServletResponse.SC_OK);
    }
}
