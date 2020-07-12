#Generating Random Graph

from networkx.generators.random_graphs import erdos_renyi_graph
n = int(input("Enter number of nodes ..."))
p = float(input("Enter the probability ...."))

g = erdos_renyi_graph(n,p)
print(g.nodes)
print(g.edges)
