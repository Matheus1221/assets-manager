package com.matheus.assetsmanager.repository;

import com.matheus.assetsmanager.model.Asset;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssetsRepository extends JpaRepository<Asset, Long> {
}