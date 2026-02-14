package com.matheus.assetsmanager.service;
import com.matheus.assetsmanager.model.Asset;
import com.matheus.assetsmanager.repository.AssetsRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class AssetService {

    private final AssetsRepository repository;

    public AssetService(AssetsRepository repository) {
        this.repository = repository;
    }

    public List<Asset> findAll() {
        return repository.findAll();
    }

    public Asset findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Asset not found"));
    }

    public Asset save(Asset asset) {
        return repository.save(asset);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
