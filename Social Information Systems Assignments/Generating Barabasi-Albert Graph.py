#Generating Barabasi-Albert Graph

import networkx as nx
import matplotlib.pyplot as plt

n = int(input("Enter num of nodes ..."))
m = int(input("Enter num of edges to attach from a new node to existing nodes ..."))
G= nx.barabasi_albert_graph(n,m)
nx.draw(G, with_labels=True)
plt.show()
