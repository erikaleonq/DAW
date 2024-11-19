import { FollowService } from "../services/FollowService.js";

class FollowController {
  #service;
  constructor() {
    this.#service = new FollowService();
  }

  follow = async (req, res) => {
    const { id_proyecto } = req.params;
    const { id } = req.user; // Extraer id del usuario autenticado

    try {
      const result = await this.#service.followProject(id, id_proyecto);
      res.status(201).json(result);
    } catch (error) {
      console.error("Error en follow:", error);
      res.status(error.code || 500).json({ message: error.message });
    }
  };

  unfollow = async (req, res) => {
    const { id_proyecto } = req.params;
    const { id } = req.user;

    try {
      await this.#service.unfollowProject(id, id_proyecto);
      res.status(204).send();
    } catch (error) {
      console.error("Error en unfollow:", error);
      res.status(error.code || 500).json({ message: error.message });
    }
  };

  getFollowed = async (req, res) => {
    const { id } = req.user;

    try {
      const projects = await this.#service.getFollowedProjects(id);
      res.json(projects);
    } catch (error) {
      console.error("Error en getFollowed:", error);
      res.status(error.code || 500).json({ message: error.message });
    }
  };
}

export { FollowController };
