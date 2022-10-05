package com.abel.todoapp.controllers;

import com.abel.todoapp.models.Post;
import com.abel.todoapp.repositories.PostRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @GetMapping
    public List<Post> list() {
        return postRepository.findAll();
    }

    @GetMapping("{id}")
    public Post getPost(@PathVariable Long id) {
        return postRepository.getReferenceById(id);
    }

    @DeleteMapping("{id}")
    public void deletePost(@PathVariable Long id) {
        postRepository.deleteById(id);
    }

    @PostMapping
    public Post addPost(@RequestBody String content) {
        return postRepository.saveAndFlush(new Post(content));
    }

    @PutMapping("{id}")
    public Post updatePost(@PathVariable Long id, @RequestBody Post post){
        Post currentPost = postRepository.getReferenceById(id);
        BeanUtils.copyProperties(post, currentPost, "post_id");
        return postRepository.saveAndFlush(currentPost);
    }
}
