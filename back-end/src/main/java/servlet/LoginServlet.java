package servlet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import dao.UserDAO;
import model.User;

import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.IOException;

public class LoginServlet extends HttpServlet {

    static class LoginPayload {
        String email;
        String password;
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        LoginPayload p = new Gson().fromJson(req.getReader(), LoginPayload.class);

        if (p == null || p.email == null || p.password == null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"message\":\"Email and password required\"}");
            return;
        }

        String email = p.email.trim().toLowerCase();

        UserDAO dao = new UserDAO();
        User user = dao.findByEmail(email);

        if (user == null || !user.getPassword().equals(p.password)) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"message\":\"Invalid email or password\"}");
            return;
        }

        JsonObject out = new JsonObject();
        out.addProperty("userId", user.getId());
        out.addProperty("email", user.getEmail());
        out.addProperty("firstName", user.getFname());
        out.addProperty("lastName", user.getLname());

        resp.getWriter().write(new Gson().toJson(out));
    }
}
