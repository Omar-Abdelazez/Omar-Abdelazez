#Community Detection in NetworkX

import networkx as nx

def edge_to_remove(g):
    dict1 = nx.edge_betweenness_centrality(g)
    list_of_tuples = dict1.items()
    #list_of_tuples.sort(key=lambda x: x[1], reverse=True)
    return list_of_tuples[0][0]

def girvan(g):
    c = nx.connected_components(g)
    l = len(list(c))
    print('the number of connected component is ', l)
    while(l==1):
        g.remove_edge(*edge_to_remove(g))
        c = nx.connected_components_subgraphs(g)
        l = len(list(c))
        print('the number of connected component is ', l)
    return c

g = nx.barbell_graph(5,0)
c = girvan(g)
for i in c:
    print(i.nodes)
    print('.....')
