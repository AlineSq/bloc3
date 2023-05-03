package com.studi.bloc3api.Controllers;

import com.studi.bloc3api.models.Category;
import com.studi.bloc3api.models.Token;
import com.studi.bloc3api.models.User;
import com.studi.bloc3api.repositories.CategoryRepository;
import com.studi.bloc3api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {

    /**
     * Liste de tokens
     */
    List<Token> tokens = new ArrayList<>();

    UserController(UserRepository repository) {
        this.userRepository = repository;
    }

    @Autowired
    private UserRepository userRepository;

    @PostMapping("check")
    public String checkToken(@RequestBody Map<String, String> body) throws IllegalAccessException {
        String _login = body.get("login");
        String _token = body.get("token");

        if (_login.length() > 0 && _token.length() > 0) {

            Token foundToken = findToken(_login);

            if (foundToken != null && foundToken.equals(_token)) {
                foundToken.dateCreation = new Date();
                return "true";
            }
        }
        throw new IllegalAccessException("Authentification échouée");
    }

    @PostMapping("login")
    public String checkUser(@RequestBody Map<String, String> body) throws IllegalAccessException {
        String _login = body.get("login");
        String _password = body.get("password");
        Token activeToken = null;
        List<User> users = userRepository.findUsers(_login);
        User user = null;
        if (users.size() == 1)
            user = users.get(0);
        if (user != null && user.isAdmin && _password !=null && _password.equals(user.password)) {

            Token foundToken = findToken(user.login);

            if (foundToken != null) {
                foundToken.dateCreation = new Date();
                return foundToken.value;
            } else {
                Token t = new Token(user.login);
                this.tokens.add(t);
                return t.value;
            }
        }
        throw new IllegalAccessException("Login ou mot de passe invalide");
    }

    /**
     * Fonction permettant de chercher le token d'un utilisateur
     * @param _login
     * @return
     */
    private Token findToken(String _login) {
        Token foundToken = null;
        for (Token t : this.tokens) {
            if (t.login.equals(_login)) {
                foundToken = t;
                break;
            }
        }
        return foundToken;
    }

    @GetMapping("/logout")
    public String logout(@RequestParam String _login) {
        Token token = findToken(_login);
        if (token != null){
            this.tokens.remove(token);
        }
        return "Déconnexion réussie";
    }
}