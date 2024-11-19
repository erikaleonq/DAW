import { validationResult, matchedData } from "express-validator";
import { ProjectService } from "../services/ProjectService.js";

class ProjectController {
  #service;
  constructor() {
    this.#service = new ProjectService();
  }

  getAll = async (req, res) => {
    try {
      const projects = await this.#service.getAllProjects();
      res.send(projects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  getOne = async (req, res) => {
    const { id_proyecto } = req.params;
    try {
      const project = await this.#service.getProjectById(id_proyecto);
      res.send(project);
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  };

  create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = matchedData(req);
    try {
      const project = await this.#service.createProject(data);
      res.status(201).send(project);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  update = async (req, res) => {
    const { id_proyecto } = req.params;
    const { nombre_proyecto, descripcion, url_logo, categorias, redes } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        const project = await this.#service.updateProject(id_proyecto, nombre_proyecto, descripcion, url_logo, categorias, redes);
    if (!project) {
        return res.status(404).send({ message: "Project not found" });
    }
    res.status(200).send(project);
    } catch (error) {
    res.status(500).send({ message: error.message });
    }
  };

  delete = async (req, res) => {
    const { id_proyecto } = req.params;
    try {
      await this.#service.deleteProject(id_proyecto);
      res.status(204).send();
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  };
}

export { ProjectController };
