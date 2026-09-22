package servlet;

import dao.TaskDAO;
import model.Task;

import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.IOException;

public class DeleteTaskServlet extends HttpServlet {

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        String idStr = req.getParameter("id");
        String userIdStr = req.getParameter("userId");

        if (idStr == null || userIdStr == null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("Missing id or userId");
            return;
        }

        int id = Integer.parseInt(idStr);
        int userId = Integer.parseInt(userIdStr);

        TaskDAO dao = new TaskDAO();
        Task existing = dao.getTaskById(id);

        if (existing == null) {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return;
        }

        if (existing.getUserId() != userId) {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            resp.getWriter().write("Not allowed");
            return;
        }

        dao.deleteTask(id);
        resp.setStatus(HttpServletResponse.SC_OK);
    }
}
