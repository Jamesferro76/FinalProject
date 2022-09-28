package com.skilldistillery.intersteller.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.intersteller.entities.User;
import com.skilldistillery.intersteller.services.UserService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost" })
public class UserController {

	@Autowired
	private UserService userServ;

	@GetMapping("users")
	public List<User> index(Principal principal) {
		List<User> users = userServ.index(principal.getName());
		return users;
	}

	@GetMapping("users/profile/{userId}")
	public User findById(@PathVariable Integer userId, HttpServletRequest req, HttpServletResponse resp,
			Principal principal) {
		User user = userServ.show(principal.getName(), userId);
		if (user == null) {
			resp.setStatus(404);

		} else {
			resp.setStatus(202);
		}
		return user;
	}

	@PostMapping("users")
	public User addUser(HttpServletRequest req, HttpServletResponse resp, Principal principal, @RequestBody User user) {
		user = userServ.create(principal.getName(), user);
		try {
			if (user == null) {
				resp.setStatus(404);
			} else {
				resp.setStatus(201);
			}

		} catch (Exception e) {
			resp.setStatus(400);
			e.printStackTrace();
			user = null;

		}
		return user;
	}

	@PutMapping("users/{userId}")
	public User updateUser(@PathVariable Integer userId, HttpServletRequest req, HttpServletResponse resp,
			Principal principal, @RequestBody User user) {
		try {
			user = userServ.adminUpdate(principal.getName(), userId, user);

			if (user == null) {
				resp.setStatus(404);
			} else {
				resp.setStatus(201);
			}

		} catch (Exception e) {
			resp.setStatus(400);
			e.printStackTrace();
			user = null;

		}
		return user;
	}
	
	@PutMapping("users")
	public User update( HttpServletRequest req, HttpServletResponse resp,
			Principal principal, @RequestBody User user) {
		
		User updatedUser = userServ.update(user, principal.getName());

			if (updatedUser == null) {
				resp.setStatus(404);
			} else {
				resp.setStatus(201);
			}

	
		return updatedUser;
	}

	@DeleteMapping("users/{userId}")
	public void deleteUser(@PathVariable Integer userId, HttpServletRequest req, HttpServletResponse resp,
			Principal principal) {
		try {
			boolean deleted = userServ.destroy(principal.getName(), userId);
			if (deleted) {
				resp.setStatus(204);

			} else {
				resp.setStatus(404);
			}

		} catch (Exception e) {
			resp.setStatus(400);
			e.printStackTrace();

		}
	}

	@GetMapping("users/{username}")
	public User getUserForTest(@PathVariable String username, HttpServletResponse resp) {
		User user = userServ.findByUsername(username);

		if (user != null) {

			return user;
		}

		else {
			resp.setStatus(404);
			user = null;
		}
		return user;
	}

	@GetMapping("ichat/profile/{profileId}")
	public User findByProfile(@PathVariable int profileId, HttpServletRequest req, HttpServletResponse resp,
			Principal principal) {
		User user = userServ.findByProfile(profileId);

		if (user != null) {
			return user;
		}
		else {
			resp.setStatus(404);
			user = null;
		}
		return user;
	}

}
