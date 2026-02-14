package com.matheus.assetsmanager;

import com.matheus.assetsmanager.model.Asset;
import com.matheus.assetsmanager.repository.AssetsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.ObjectMapper;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;



@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AssetManagerApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private AssetsRepository assetsRepository;
    @BeforeEach
    void cleanDatabase() {
        assetsRepository.deleteAll();
    }

    // POST TEST

    @Test
    void shouldCreateAsset() throws Exception {
        Asset asset = new Asset();
        asset.setName("Notebook");
        asset.setSerialNumber("123");
        asset.setCategory("Computador");
        asset.setStatus("IN_USE");

        mockMvc.perform(post("/assets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(asset)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.name").value("Notebook"))
                .andExpect(jsonPath("$.category").value("Computador"))
                .andExpect(jsonPath("$.serialNumber").value("123"));
    }

    @Test
    void shouldReturnCorrectFields() throws Exception {

        Asset asset = new Asset();
        asset.setName("Keyboard");
        asset.setSerialNumber("789");

        mockMvc.perform(post("/assets")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(asset)));

        mockMvc.perform(get("/assets"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").exists())
                .andExpect(jsonPath("$[0].name").exists())
                .andExpect(jsonPath("$[0].serialNumber").exists());
    }

    @Test
    void shouldReturnErrorWhenNameIsNull() throws Exception {

        Asset asset = new Asset();
        asset.setSerialNumber("123");

        mockMvc.perform(post("/assets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(asset)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldReturnAssetById() throws Exception {

        Asset asset = new Asset();
        asset.setName("Mouse");
        asset.setSerialNumber("789");

        String response = mockMvc.perform(post("/assets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(asset)))
                .andReturn()
                .getResponse()
                .getContentAsString();

        Asset created = objectMapper.readValue(response, Asset.class);

        mockMvc.perform(get("/assets/" + created.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Mouse"));
    }

    // GET TEST

    @Test
    void shouldReturnAllAssets() throws Exception {

        Asset asset = new Asset();
        asset.setName("Monitor");
        asset.setSerialNumber("456");

        mockMvc.perform(post("/assets")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(asset)));

        mockMvc.perform(get("/assets"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    void shouldReturnEmptyListWhenNoAssets() throws Exception {

        mockMvc.perform(get("/assets"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));
    }

    @Test
    void shouldReturn404WhenAssetNotFound() throws Exception {

        mockMvc.perform(get("/assets/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldFilterByStatus() throws Exception {
        mockMvc.perform(get("/assets?status=IN_USE"))
                .andExpect(status().isOk());
    }

            // DELETE TEST
    @Test
    void shouldDeleteAsset() throws Exception {

        Asset asset = new Asset();
        asset.setName("Keyboard");
        asset.setSerialNumber("999");

        String response = mockMvc.perform(post("/assets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(asset)))
                .andReturn()
                .getResponse()
                .getContentAsString();

        Asset created = objectMapper.readValue(response, Asset.class);

        mockMvc.perform(delete("/assets/" + created.getId()))
                .andExpect(status().isOk());
    }
            // PUT TEST
    @Test
    void shouldUpdateAsset() throws Exception {

        Asset asset = new Asset();
        asset.setName("Old Name");
        asset.setSerialNumber("123");

        String response = mockMvc.perform(post("/assets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(asset)))
                .andReturn()
                .getResponse()
                .getContentAsString();

        Asset created = objectMapper.readValue(response, Asset.class);

        created.setName("New Name");

        mockMvc.perform(put("/assets/" + created.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(created)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("New Name"));
    }

}
