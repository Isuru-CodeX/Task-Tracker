package servlet;

import com.google.gson.Gson;
import dao.UserDAO;
import model.User;

import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.IOException;

public class SignupServlet extends HttpServlet {

    static class SignupPayload {
        String firstName;
        String lastName;
        String email;
        String password;
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        SignupPayload p = new Gson().fromJson(req.getReader(), SignupPayload.class);

        if (p == null || p.firstName == null || p.lastName == null ||
                p.email == null || p.password == null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"message\":\"Missing fields\"}");
            return;
        }

        String email = p.email.trim().toLowerCase();

        UserDAO dao = new UserDAO();
        if (dao.findByEmail(email) != null) {
            resp.setStatus(HttpServletResponse.SC_CONFLICT);
            resp.getWriter().write("{\"message\":\"Email already exists\"}");
            return;
        }

        User u = new User();
        u.setFname(p.firstName.trim());
        u.setLname(p.lastName.trim());
        u.setEmail(email);
        u.setPassword(p.password);

        dao.save(u);

        resp.setStatus(HttpServletResponse.SC_CREATED);
        resp.getWriter().write("{\"message\":\"Signup successful\"}");
    }
}
