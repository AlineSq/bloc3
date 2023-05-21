package com.studi.bloc3api;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.server.ResponseStatusException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.studi.bloc3api.Controllers.UserController;
import com.studi.bloc3api.models.User;
import com.studi.bloc3api.repositories.UserRepository;
import com.studi.bloc3api.services.UserService;

@SpringBootTest
class UserTests {

     @InjectMocks
     private UserService userService;

     @Mock
     private UserRepository userRepository;

     private UserController userController;

     @BeforeEach
     public void setup() {
          userController = new UserController(userService);
     }

     @Test
     public void test_checkUser_valid() {

          assertNotNull(logValideUserAndGetToken());
     }

     private String logValideUserAndGetToken() {
          // Arrange
          Map<String, String> body = new HashMap<>();
          body.put("login", "fakeLogin");
          body.put("password", "fakePassword");

          User user = new User();
          user.login = "fakeLogin";
          user.password = "fakePassword";
          user.isAdmin = true;

          List<User> users = new ArrayList<>();
          users.add(user);

          // Asset
          when(userRepository.findUsers(any(String.class))).thenReturn(users);

          return userController.checkUser(body);
     }

     @Test
     public void test_checkUser_invalidPassword() {
          // Arrange
          Map<String, String> body = new HashMap<>();
          body.put("login", "fakeLogin");
          body.put("password", "BadPassword");

          User user = new User();
          user.login = "fakeLogin";
          user.password = "fakePassword";
          user.isAdmin = true;

          List<User> users = new ArrayList<>();
          users.add(user);

          // Asset
          when(userRepository.findUsers(any(String.class))).thenReturn(users);

          // test
          assertThrows(ResponseStatusException.class, () -> userController.checkUser(body),
                    "La méthode doit throw une exception UNAUTHORIZED");
     }

     @Test
     public void test_checkUser_NotUserFind() {
          // Arrange
          Map<String, String> body = new HashMap<>();
          body.put("login", "fakeLogin");
          body.put("password", "BadPassword");

          List<User> users = new ArrayList<>();

          // Asset
          when(userRepository.findUsers(any(String.class))).thenReturn(users);

          // test
          assertThrows(ResponseStatusException.class, () -> userController.checkUser(body),
                    "La méthode doit throw une exception UNAUTHORIZED");
     }

     @Test
     public void test_checkToken_invalid() {
          assertThrows(ResponseStatusException.class, () -> userController.checkToken("ok"),
                    "La méthode doit throw une exception UNAUTHORIZED");
     }
     
     @Test
     public void test_checkToken_valid() {
          String validToken = logValideUserAndGetToken();
          String result = userController.checkToken(validToken);
          assertEquals(result, "true");
     }

     @Test
     public void test_logout_valid() {
          String validToken = logValideUserAndGetToken();
          String result = userController.logout(validToken);
          assertEquals(result, "Déconnexion réussie");

          assertThrows(ResponseStatusException.class, () -> userController.checkToken(validToken),
                    "La méthode doit throw une exception UNAUTHORIZED");
     }

     @Test
     public void test_logout_invalid() {
          assertThrows(ResponseStatusException.class, () -> userController.logout("ok"),
                    "La méthode doit throw une exception UNAUTHORIZED");
     }

}