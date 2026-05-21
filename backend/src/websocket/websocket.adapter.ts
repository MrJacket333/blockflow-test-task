import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class WebsocketAdapter {
  private server: Server | null = null;
  private jobClients = new Map<string, Set<string>>();

  setServer(server: Server) {
    this.server = server;
  }

  addClient(jobId: string, socketId: string) {
    const clients = this.jobClients.get(jobId) ?? new Set();
    clients.add(socketId);
    this.jobClients.set(jobId, clients);
  }

  removeClient(socketId: string) {
    for (const [jobId, sockets] of this.jobClients.entries()) {
      if (sockets.has(socketId)) {
        sockets.delete(socketId);
        if (sockets.size === 0) {
          this.jobClients.delete(jobId);
        }
      }
    }
  }

  removeJobClients(jobId: string) {
    this.jobClients.delete(jobId);
  }

  emitToJobClients(
    jobId: string,
    event: string,
    data: Record<string, unknown>,
  ) {
    if (!this.server) return;
    const sockets = this.jobClients.get(jobId);
    if (sockets) {
      sockets.forEach((socketId) => {
        this.server!.to(socketId).emit(event, data);
      });
    }
  }
}
