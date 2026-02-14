package com.matheus.assetsmanager.controller;

import com.matheus.assetsmanager.model.Asset;
import com.matheus.assetsmanager.service.AssetService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/assets")
@CrossOrigin
public class AssetController {

    private final AssetService service;

    public AssetController(AssetService service) {
        this.service = service;
    }

    @GetMapping
    public List<Asset> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Asset getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public Asset create(@RequestBody @Valid Asset asset) {
        return service.save(asset);
    }

    @PutMapping("/{id}")
    public Asset update(@PathVariable Long id, @RequestBody Asset asset) {
        asset.setId(id);
        return service.save(asset);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
