package com.studi.bloc3api.services;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.studi.bloc3api.models.Token;
import com.studi.bloc3api.models.User;
import com.studi.bloc3api.repositories.UserRepository;

@Service
public class UserService {

    /**
     * Liste de tokens
     */
    List<Token> tokens = new ArrayList<>();

    @Autowired
    private UserRepository userRepository;

    public String checkToken(String _token) {
        if (_token != null && _token.length() > 0) {

            var tokenToUse = _token;
            if (tokenToUse.contains("Bearer"))
                tokenToUse = _token.substring(7);

            Token foundToken = findTokenByToken(tokenToUse);

            if (foundToken != null && foundToken.value.equals(tokenToUse)) {

                Calendar calendar = Calendar.getInstance();
                calendar.setTime(foundToken.dateCreation);
                calendar.add(Calendar.HOUR_OF_DAY, 3);
                Date expirationDate = calendar.getTime();
                Date actualDate = new Date();
                if (actualDate.before(expirationDate)) {
                    foundToken.dateCreation = new Date();
                    return "true";
                }
            }
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    }

    public String checkUser(Map<String, String> body) {
        String _login = body.get("login");
        String _password = body.get("password");

        List<User> users = userRepository.findUsers(_login);
        User user = null;
        if (users.size() == 1)
            user = users.get(0);
        if (user != null && user.isAdmin && _password != null && _password.equals(user.password)) {

            Token foundToken = findTokenByLogin(user.login);

            if (foundToken != null) {
                foundToken.dateCreation = new Date();
                return foundToken.value;
            } else {
                Token t = new Token(user.login);
                this.tokens.add(t);
                return t.value;
            }
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    }

    /**
     * Fonction permettant de chercher le token d'un utilisateur
     * 
     * @param _login
     * @return
     */
    private Token findTokenByLogin(String _login) {
        Token foundToken = null;
        for (Token t : this.tokens) {
            if (t.login.equals(_login)) {
                foundToken = t;
                break;
            }
        }
        return foundToken;
    }

    /**
     * Fonction permettant de vérifier la présence d'un token
     * 
     * @param _login
     * @return
     */
    private Token findTokenByToken(String _token) {
        Token foundToken = null;
        if (_token != null) {
            if (_token.contains("Bearer"))
                _token = _token.substring(7);

            for (Token t : this.tokens) {
                if (t.value.equals(_token)) {
                    foundToken = t;
                    break;
                }
            }
        }
        return foundToken;
    }

    public String logout(String _token) {
        Token token = findTokenByToken(_token);
        if (token != null) {
            this.tokens.remove(token);
        }
        return "Déconnexion réussie";
    }
}
