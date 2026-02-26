import type { ChapterMeta } from './types';

const chapter3: ChapterMeta = {
  id: '3',
  title: 'Matrices and Linear Maps',
  subtitle: 'Rank, Nullity, and the Structure of Transformations',
  description: 'Understand matrices as linear transformations, master the column space and null space, and discover the Rank-Nullity theorem that ties everything together.',
  color: 'violet',
  accentHex: '#8B5CF6',
  sections: [
    {
      id: '3-1',
      chapterId: '3',
      sectionNumber: '3.1',
      title: 'Matrix Basics',
      estimatedMinutes: 8,
      plainEnglish: [
        'A **matrix** is a rectangular array of numbers arranged in rows and columns. An $m \\times n$ matrix has $m$ rows and $n$ columns. The entry in row $i$ and column $j$ is written $a_{ij}$.',
        'Matrices are more than just arrays — they encode linear transformations. Every $m \\times n$ matrix defines a function from $\\mathbb{R}^n$ to $\\mathbb{R}^m$. This is the central fact of Chapter 3.',
        'The columns of a matrix are vectors in $\\mathbb{R}^m$. We often write $A = [\\mathbf{a}_1 \\mid \\mathbf{a}_2 \\mid \\cdots \\mid \\mathbf{a}_n]$ to emphasize the column structure.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 3.1',
          title: 'Matrix',
          content: 'An $m \\times n$ **matrix** $A$ is a rectangular array $A = (a_{ij})$ where $a_{ij} \\in \\mathbb{R}$, $1 \\leq i \\leq m$, $1 \\leq j \\leq n$. The **identity matrix** $I_n$ has $a_{ii} = 1$ and $a_{ij} = 0$ for $i \\neq j$.',
        },
      ],
      whyItMatters: {
        context: 'Matrices are the fundamental data structure for encoding linear transformations and systems of equations.',
        applications: [
          'Adjacency matrices encode graphs: $a_{ij} = 1$ if there is an edge from node $i$ to node $j$',
          'Covariance matrices in statistics encode relationships between variables',
          'In deep learning, weight matrices encode learned transformations between layers',
        ],
      },
      resources: [
        {
          title: 'Introduction to matrices',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=0oGJTQCy4cQ',
          durationMinutes: 12,
          description: 'Matrix notation, entries, and dimensions.',
        },
      ],
      quiz: [
        {
          id: '3-1-q1',
          type: 'multiple-choice',
          question: 'A matrix $A$ has entry $a_{23} = 5$. This entry is in:',
          options: ['Row 5, Column 3', 'Row 2, Column 3', 'Row 3, Column 2', 'Row 2, Column 5'],
          correctAnswer: 1,
          explanation: '$a_{ij}$ is the entry in row $i$, column $j$. So $a_{23}$ is in row 2, column 3.',
        },
      ],
      commonMistakes: [
        'Confusing rows and columns in the entry notation $a_{ij}$ — first index is always the row.',
        'Writing the size as $n \\times m$ instead of $m \\times n$ (rows × columns).',
      ],
    },
    {
      id: '3-2',
      chapterId: '3',
      sectionNumber: '3.2',
      title: 'Matrix-Vector Multiplication',
      estimatedMinutes: 10,
      plainEnglish: [
        'To multiply matrix $A$ (size $m \\times n$) by vector $\\mathbf{x}$ (in $\\mathbb{R}^n$), the result $A\\mathbf{x}$ is a vector in $\\mathbb{R}^m$. The dimensions must be compatible: the number of columns of $A$ must equal the length of $\\mathbf{x}$.',
        '**The column perspective:** $A\\mathbf{x} = x_1\\mathbf{a}_1 + x_2\\mathbf{a}_2 + \\cdots + x_n\\mathbf{a}_n$ — a linear combination of the columns of $A$ weighted by the entries of $\\mathbf{x}$. This is the geometric view.',
        '**The two-finger rule (entry-by-entry):** The $i$-th entry of $A\\mathbf{x}$ is the dot product of row $i$ of $A$ with $\\mathbf{x}$: $(A\\mathbf{x})_i = \\sum_j a_{ij} x_j$. This is the computational view.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 3.2',
          title: 'Matrix-Vector Multiplication',
          content: 'For $A \\in \\mathbb{R}^{m \\times n}$ and $\\mathbf{x} \\in \\mathbb{R}^n$, $$A\\mathbf{x} = \\begin{pmatrix} \\sum_j a_{1j}x_j \\\\ \\vdots \\\\ \\sum_j a_{mj}x_j \\end{pmatrix} = x_1\\mathbf{a}_1 + \\cdots + x_n\\mathbf{a}_n$$ where $\\mathbf{a}_j$ is the $j$-th column of $A$.',
        },
      ],
      diagram: {
        type: 'MatrixVectorMultiplication',
        props: {
          matrix: [[2, 1], [-1, 3], [0, 2]],
          vector: [1, 2],
        },
      },
      whyItMatters: {
        context: 'Matrix-vector multiplication is the core computational primitive of linear algebra and deep learning.',
        applications: [
          'Neural network forward pass: each layer computes $\\mathbf{y} = A\\mathbf{x} + \\mathbf{b}$',
          'Image filtering: applying a kernel is matrix-vector multiplication (vectorized)',
          'PageRank: Google\'s original algorithm computes repeated matrix-vector products',
        ],
      },
      resources: [
        {
          title: 'Linear transformations and matrices',
          channel: '3Blue1Brown',
          url: 'https://www.youtube.com/watch?v=kYB8IZa5AuE',
          durationMinutes: 10,
          description: 'Matrix-vector multiplication as a linear transformation.',
        },
      ],
      quiz: [
        {
          id: '3-2-q1',
          type: 'multiple-choice',
          question: 'The product $A\\mathbf{x}$ for $A \\in \\mathbb{R}^{3 \\times 2}$ and $\\mathbf{x} \\in \\mathbb{R}^2$ lives in:',
          options: ['$\\mathbb{R}^2$', '$\\mathbb{R}^3$', '$\\mathbb{R}^6$', '$\\mathbb{R}^{3 \\times 2}$'],
          correctAnswer: 1,
          explanation: 'An $m \\times n$ matrix maps $\\mathbb{R}^n \\to \\mathbb{R}^m$. Here $m=3$, $n=2$, so $A\\mathbf{x} \\in \\mathbb{R}^3$.',
        },
      ],
      commonMistakes: [
        'Forgetting that $A\\mathbf{x}$ requires $n$ (columns of $A$) to equal the length of $\\mathbf{x}$.',
        'Computing $A\\mathbf{x}$ by rows when the column perspective is more geometric and informative.',
      ],
    },
    {
      id: '3-3',
      chapterId: '3',
      sectionNumber: '3.3',
      title: 'Linear Maps as Functions',
      estimatedMinutes: 9,
      plainEnglish: [
        'A **linear map** (or linear transformation) is a function $T: \\mathbb{R}^n \\to \\mathbb{R}^m$ that respects the vector space structure: it preserves addition ($T(\\mathbf{u} + \\mathbf{v}) = T(\\mathbf{u}) + T(\\mathbf{v})$) and scalar multiplication ($T(c\\mathbf{u}) = cT(\\mathbf{u})$).',
        'These two conditions together say: $T$ preserves linear combinations. If you know where $T$ sends each basis vector, you know $T$ completely — because every vector is a linear combination of basis vectors.',
        'Examples: rotation, reflection, scaling, projection, shearing. These are all linear maps. Translations (shifting by a fixed vector) are NOT linear (they don\'t fix the origin).',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 3.3',
          title: 'Linear Map',
          content: 'A function $T: \\mathbb{R}^n \\to \\mathbb{R}^m$ is a **linear map** if for all $\\mathbf{u}, \\mathbf{v} \\in \\mathbb{R}^n$ and $c \\in \\mathbb{R}$: \\begin{enumerate} \\item $T(\\mathbf{u} + \\mathbf{v}) = T(\\mathbf{u}) + T(\\mathbf{v})$ \\item $T(c\\mathbf{u}) = cT(\\mathbf{u}) \\end{enumerate} Equivalently: $T(c_1\\mathbf{u} + c_2\\mathbf{v}) = c_1T(\\mathbf{u}) + c_2T(\\mathbf{v})$.',
        },
      ],
      whyItMatters: {
        context: 'Linear maps are the morphisms of linear algebra — the structure-preserving functions between vector spaces.',
        applications: [
          'Computer graphics: every geometric transformation (rotate, scale, reflect) is a linear map',
          'Signal processing: all linear filters are linear maps on signal vectors',
          'Quantum mechanics: observables are linear operators (linear maps on function spaces)',
        ],
      },
      resources: [
        {
          title: 'Linear transformations',
          channel: '3Blue1Brown',
          url: 'https://www.youtube.com/watch?v=kYB8IZa5AuE',
          durationMinutes: 10,
          description: 'Geometric visualization of linear transformations.',
        },
      ],
      quiz: [
        {
          id: '3-3-q1',
          type: 'true-false',
          question: 'The function $T(x_1, x_2) = (x_1 + 1, x_2)$ is a linear map.',
          correctAnswer: false,
          explanation: '$T(\\mathbf{0}) = (1, 0) \\neq \\mathbf{0}$. Linear maps must send $\\mathbf{0}$ to $\\mathbf{0}$. This is a translation, not a linear map.',
        },
      ],
      commonMistakes: [
        'Thinking translations are linear — they are affine (linear plus a constant offset).',
        'Checking only one of the two linearity conditions — both addition-preservation and scaling-preservation are required.',
      ],
    },
    {
      id: '3-4',
      chapterId: '3',
      sectionNumber: '3.4',
      title: 'Matrices and Linear Maps: The Equivalence',
      estimatedMinutes: 10,
      plainEnglish: [
        'Every matrix gives a linear map: multiply by the matrix. Every linear map between finite-dimensional spaces is given by multiplication by a matrix. This is the fundamental duality of linear algebra.',
        'Given a linear map $T: \\mathbb{R}^n \\to \\mathbb{R}^m$, its matrix is formed by computing $T(\\mathbf{e}_j)$ for each standard basis vector — then assembling the results as columns: $A = [T(\\mathbf{e}_1) \\mid \\cdots \\mid T(\\mathbf{e}_n)]$.',
        'This equivalence means that studying matrices IS studying linear maps. We freely use both languages.',
      ],
      formalView: [
        {
          type: 'theorem',
          label: 'Theorem 3.4',
          title: 'Matrix-Map Equivalence',
          content: 'Every matrix $A \\in \\mathbb{R}^{m \\times n}$ defines a linear map $T_A: \\mathbb{R}^n \\to \\mathbb{R}^m$ by $T_A(\\mathbf{x}) = A\\mathbf{x}$. Conversely, every linear map $T: \\mathbb{R}^n \\to \\mathbb{R}^m$ is equal to $T_A$ for a unique matrix $A$ whose $j$-th column is $T(\\mathbf{e}_j)$.',
        },
      ],
      whyItMatters: {
        context: 'This equivalence unifies algebra (matrices) with geometry (transformations), doubling our analytical power.',
        applications: [
          'To understand how a matrix transforms space geometrically, think of it as a linear map',
          'To compute a linear map efficiently, find its matrix representation',
          'Change of basis is a change of matrix representation of the same underlying linear map',
        ],
      },
      resources: [
        {
          title: 'Matrices and linear transformations',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=BFc_YkLX1-A',
          durationMinutes: 14,
          description: 'How to find the matrix of a linear transformation.',
        },
      ],
      quiz: [
        {
          id: '3-4-q1',
          type: 'multiple-choice',
          question: 'The matrix of the linear map $T(x_1, x_2) = (2x_1 + x_2, 3x_2)$ is:',
          options: [
            '$\\begin{pmatrix}2 & 1 \\\\ 0 & 3\\end{pmatrix}$',
            '$\\begin{pmatrix}2 & 0 \\\\ 1 & 3\\end{pmatrix}$',
            '$\\begin{pmatrix}2 & 3 \\\\ 1 & 0\\end{pmatrix}$',
            '$\\begin{pmatrix}1 & 2 \\\\ 3 & 0\\end{pmatrix}$',
          ],
          correctAnswer: 0,
          explanation: '$T(1,0) = (2,0)$ is the first column. $T(0,1) = (1,3)$ is the second column. Matrix: $\\begin{pmatrix}2 & 1 \\\\ 0 & 3\\end{pmatrix}$.',
        },
      ],
      commonMistakes: [
        'Computing columns of $A$ as $T(\\mathbf{e}_j)$ but writing entries in the wrong order.',
        'Thinking the matrix representation is unique regardless of basis — it depends on the choice of basis for domain and codomain.',
      ],
    },
    {
      id: '3-5',
      chapterId: '3',
      sectionNumber: '3.5',
      title: 'Column Span and Rank',
      estimatedMinutes: 10,
      plainEnglish: [
        'The **column span** (or column space) of a matrix $A$ is the span of its columns: the set of all vectors of the form $A\\mathbf{x}$ as $\\mathbf{x}$ ranges over $\\mathbb{R}^n$. It is a subspace of $\\mathbb{R}^m$.',
        'The **rank** of $A$ is the dimension of its column span: $\\text{Rank}(A) = \\dim(\\text{Col}(A))$. Rank measures how many "truly independent directions" the matrix can produce as output.',
        'Rank equals the number of pivot columns in the echelon form of $A$. A matrix has full rank when its rank equals $\\min(m, n)$.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 3.5',
          title: 'Column Space and Rank',
          content: 'The **column space** of $A \\in \\mathbb{R}^{m \\times n}$ is $\\text{Col}(A) = \\{A\\mathbf{x} : \\mathbf{x} \\in \\mathbb{R}^n\\} \\subseteq \\mathbb{R}^m$. The **rank** is $\\text{Rank}(A) = \\dim(\\text{Col}(A))$, equal to the number of pivots in echelon form.',
        },
      ],
      whyItMatters: {
        context: 'The column space is the set of all outputs a matrix can produce — it determines solvability.',
        applications: [
          'Solvability of $A\\mathbf{x} = \\mathbf{b}$: solvable iff $\\mathbf{b} \\in \\text{Col}(A)$',
          'In data science, rank determines how many "independent factors" explain a dataset',
          'Rank of the Jacobian matrix determines degrees of freedom in robotic manipulators',
        ],
      },
      resources: [
        {
          title: 'Column space, row space, null space',
          channel: '3Blue1Brown',
          url: 'https://www.youtube.com/watch?v=uQhTuRlWMxw',
          durationMinutes: 10,
          description: 'Column space as the "reach" of a matrix.',
        },
      ],
      quiz: [
        {
          id: '3-5-q1',
          type: 'multiple-choice',
          question: 'Matrix $A$ has size $4 \\times 3$ and rank 2. The column space has dimension:',
          options: ['3', '4', '2', '1'],
          correctAnswer: 2,
          explanation: '$\\text{Rank}(A) = \\dim(\\text{Col}(A)) = 2$ by definition. The column space is 2-dimensional within $\\mathbb{R}^4$.',
        },
      ],
      commonMistakes: [
        'Confusing rank with the number of rows or columns — rank is the dimension of the column space.',
        'Thinking columns of $A$ directly form a basis for Col($A$) — only the pivot columns do.',
      ],
    },
    {
      id: '3-6',
      chapterId: '3',
      sectionNumber: '3.6',
      title: 'Surjectivity: Hitting Every Output',
      estimatedMinutes: 9,
      plainEnglish: [
        'A linear map $A: \\mathbb{R}^n \\to \\mathbb{R}^m$ is **surjective** (or onto) if every vector in $\\mathbb{R}^m$ is the output of some input: for every $\\mathbf{b} \\in \\mathbb{R}^m$, the equation $A\\mathbf{x} = \\mathbf{b}$ has at least one solution.',
        'Geometrically: the map "covers" all of $\\mathbb{R}^m$ — no output is unreachable. This requires the columns of $A$ to span all of $\\mathbb{R}^m$, which means $\\text{Rank}(A) = m$.',
        'Surjectivity requires at least as many columns as rows: $n \\geq m$. A "fat" matrix ($n > m$) can be surjective; a square matrix may or may not be; a "tall" matrix ($n < m$) can never be surjective (too few columns to span $\\mathbb{R}^m$).',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 3.6',
          title: 'Surjectivity',
          content: '$A: \\mathbb{R}^n \\to \\mathbb{R}^m$ is **surjective** if $\\text{Col}(A) = \\mathbb{R}^m$, equivalently if $\\text{Rank}(A) = m$.',
        },
        {
          type: 'theorem',
          label: 'Theorem 3.6',
          content: 'The following are equivalent for $A \\in \\mathbb{R}^{m \\times n}$: (1) $A$ is surjective; (2) $A\\mathbf{x} = \\mathbf{b}$ has a solution for every $\\mathbf{b}$; (3) The columns of $A$ span $\\mathbb{R}^m$; (4) $\\text{Rank}(A) = m$.',
        },
      ],
      whyItMatters: {
        context: 'Surjectivity determines whether a system is always solvable — a fundamental question in applications.',
        applications: [
          'A control system is controllable iff the control matrix is surjective (can reach any state)',
          'A communication channel is surjective iff all messages can be transmitted without ambiguity at the output',
          'An overdetermined system ($m > n$) is almost never surjective — generic $\\mathbf{b}$ has no solution',
        ],
      },
      resources: [
        {
          title: 'Surjective and injective linear maps',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=7UJ4CFRGd-U',
          durationMinutes: 50,
          description: 'Geometric interpretation of surjectivity and injectivity.',
        },
      ],
      quiz: [
        {
          id: '3-6-q1',
          type: 'true-false',
          question: 'A $3 \\times 2$ matrix can be surjective.',
          correctAnswer: false,
          explanation: 'For surjectivity we need $\\text{Rank}(A) = m = 3$, but rank $\\leq \\min(m,n) = \\min(3,2) = 2 < 3$. Impossible.',
        },
      ],
      commonMistakes: [
        'Confusing surjectivity (every output reachable) with injectivity (every output has unique pre-image).',
        'Assuming a system is always solvable — surjectivity must be verified.',
      ],
    },
    {
      id: '3-7',
      chapterId: '3',
      sectionNumber: '3.7',
      title: 'The Null Space',
      estimatedMinutes: 10,
      plainEnglish: [
        'The **null space** (or kernel) of $A$ is the set of all vectors that map to zero: $\\text{Null}(A) = \\{\\mathbf{x} : A\\mathbf{x} = \\mathbf{0}\\}$. It is always a subspace of $\\mathbb{R}^n$ (the domain).',
        'The null space captures the "collapse" of the map — vectors in the null space all land at the same point (the origin). A large null space means the map loses a lot of information.',
        'The **nullity** is the dimension of the null space: $\\text{Nullity}(A) = \\dim(\\text{Null}(A))$. Nullity equals the number of free variables when solving $A\\mathbf{x} = \\mathbf{0}$.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 3.7',
          title: 'Null Space and Nullity',
          content: 'The **null space** of $A \\in \\mathbb{R}^{m \\times n}$ is $$\\text{Null}(A) = \\{\\mathbf{x} \\in \\mathbb{R}^n : A\\mathbf{x} = \\mathbf{0}\\}$$ This is always a subspace of $\\mathbb{R}^n$. The **nullity** is $\\text{Nullity}(A) = \\dim(\\text{Null}(A))$.',
        },
      ],
      whyItMatters: {
        context: 'The null space tells us exactly how much information is lost by applying the matrix.',
        applications: [
          'A camera projection matrix has a nontrivial null space: depth information is lost',
          'The null space of an audio filter gives the frequencies completely eliminated',
          'In control theory, the null space of the output matrix gives unobservable state directions',
        ],
      },
      resources: [
        {
          title: 'Null space and column space',
          channel: '3Blue1Brown',
          url: 'https://www.youtube.com/watch?v=uQhTuRlWMxw',
          durationMinutes: 10,
          description: 'Visualizing the null space as the kernel of a transformation.',
        },
      ],
      quiz: [
        {
          id: '3-7-q1',
          type: 'true-false',
          question: 'The null space of any matrix always contains the zero vector.',
          correctAnswer: true,
          explanation: '$A\\mathbf{0} = \\mathbf{0}$ always, so $\\mathbf{0} \\in \\text{Null}(A)$ for every matrix $A$.',
        },
      ],
      commonMistakes: [
        'Confusing the null space (in the domain $\\mathbb{R}^n$) with the column space (in the codomain $\\mathbb{R}^m$).',
        'Thinking the null space is "unimportant" — it determines whether solutions are unique.',
      ],
    },
    {
      id: '3-8',
      chapterId: '3',
      sectionNumber: '3.8',
      title: 'Injectivity: No Collisions',
      estimatedMinutes: 9,
      plainEnglish: [
        'A linear map $A: \\mathbb{R}^n \\to \\mathbb{R}^m$ is **injective** (or one-to-one) if different inputs always produce different outputs: $\\mathbf{x}_1 \\neq \\mathbf{x}_2 \\Rightarrow A\\mathbf{x}_1 \\neq A\\mathbf{x}_2$. No two inputs "collide" at the same output.',
        'Equivalently (by linearity): $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution $\\mathbf{x} = \\mathbf{0}$. The null space is trivial: $\\text{Null}(A) = \\{\\mathbf{0}\\}$.',
        'Geometrically: the map is "faithful" — it doesn\'t "compress" any direction to zero. An injective map requires at least as many rows as columns: $m \\geq n$.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 3.8',
          title: 'Injectivity',
          content: '$A: \\mathbb{R}^n \\to \\mathbb{R}^m$ is **injective** if $A\\mathbf{x}_1 = A\\mathbf{x}_2 \\Rightarrow \\mathbf{x}_1 = \\mathbf{x}_2$. Equivalently, $\\text{Null}(A) = \\{\\mathbf{0}\\}$, i.e., $\\text{Nullity}(A) = 0$.',
        },
      ],
      whyItMatters: {
        context: 'Injectivity means the map is reversible — from the output, we can uniquely recover the input.',
        applications: [
          'A linear code is injective iff distinct messages produce distinct codewords',
          'A linear measurement system is injective iff distinct signals produce distinct measurements',
          'A transformation is injective iff it has a left inverse (can undo it)',
        ],
      },
      resources: [
        {
          title: 'Injective and surjective functions',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=xKNX8BUWR0g',
          durationMinutes: 11,
          description: 'One-to-one and onto: what they mean geometrically.',
        },
      ],
      quiz: [
        {
          id: '3-8-q1',
          type: 'multiple-choice',
          question: 'A $2 \\times 3$ matrix can be injective?',
          options: [
            'Yes, always',
            'No, never',
            'Only if rank = 2',
            'Only if rank = 3',
          ],
          correctAnswer: 1,
          explanation: 'Injectivity requires Nullity($A$) = 0, i.e., Rank($A$) = $n = 3$. But Rank($A$) ≤ $\\min(2,3) = 2 < 3$. A $2 \\times 3$ matrix can never be injective.',
        },
      ],
      commonMistakes: [
        'Thinking injectivity requires the matrix to be square — it just requires $m \\geq n$.',
        'Confusing injective (no collisions) with surjective (covers everything).',
      ],
    },
    {
      id: '3-9',
      chapterId: '3',
      sectionNumber: '3.9',
      title: 'Injectivity and Nullity',
      estimatedMinutes: 8,
      plainEnglish: [
        'The precise algebraic characterization of injectivity: $A$ is injective if and only if $\\text{Nullity}(A) = 0$. Equivalently, $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution.',
        'Why? If $A\\mathbf{x}_1 = A\\mathbf{x}_2$, then $A(\\mathbf{x}_1 - \\mathbf{x}_2) = \\mathbf{0}$, so $\\mathbf{x}_1 - \\mathbf{x}_2 \\in \\text{Null}(A)$. If the null space is trivial, then $\\mathbf{x}_1 - \\mathbf{x}_2 = \\mathbf{0}$, so $\\mathbf{x}_1 = \\mathbf{x}_2$.',
        'This gives a clean test: to check if $A$ is injective, solve $A\\mathbf{x} = \\mathbf{0}$ and check if the only solution is $\\mathbf{x} = \\mathbf{0}$.',
      ],
      formalView: [
        {
          type: 'theorem',
          label: 'Theorem 3.9',
          content: '$A \\in \\mathbb{R}^{m \\times n}$ is injective $\\Longleftrightarrow$ $\\text{Nullity}(A) = 0$ $\\Longleftrightarrow$ The equation $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution $\\mathbf{x} = \\mathbf{0}$.',
        },
      ],
      whyItMatters: {
        context: 'The nullity gives a computable measure of injectivity failure.',
        applications: [
          'Nullity = 0 means the system $A\\mathbf{x} = \\mathbf{b}$ has at most one solution',
          'In machine learning, large nullity in a feature matrix signals collinearity issues',
        ],
      },
      resources: [
        {
          title: 'Null space relates to injective maps',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=yjBerM-GKYE',
          durationMinutes: 49,
          description: 'Lecture 10: Null space and injectivity.',
        },
      ],
      quiz: [
        {
          id: '3-9-q1',
          type: 'true-false',
          question: 'If $A$ has nullity 0, then $A\\mathbf{x} = \\mathbf{b}$ has at most one solution for any $\\mathbf{b}$.',
          correctAnswer: true,
          explanation: 'Nullity 0 means $A$ is injective — distinct inputs give distinct outputs. So for any fixed $\\mathbf{b}$, at most one $\\mathbf{x}$ satisfies $A\\mathbf{x} = \\mathbf{b}$.',
        },
      ],
      commonMistakes: [
        'Confusing "at most one solution" (injectivity) with "exactly one solution" (injectivity + surjectivity = bijectivity).',
      ],
    },
    {
      id: '3-10',
      chapterId: '3',
      sectionNumber: '3.10',
      title: 'Injectivity and Linear Independence',
      estimatedMinutes: 8,
      plainEnglish: [
        'There is a beautiful connection between injectivity of $A$ and the columns of $A$. $A$ is injective if and only if its columns are **linearly independent**.',
        'Why? $A\\mathbf{x} = x_1\\mathbf{a}_1 + \\cdots + x_n\\mathbf{a}_n = \\mathbf{0}$ has only the trivial solution iff the columns $\\mathbf{a}_j$ are linearly independent (by definition of linear independence).',
        'This means: "the map is injective" = "the columns are independent" = "the null space is trivial." Three equivalent ways to say the same thing.',
      ],
      formalView: [
        {
          type: 'theorem',
          label: 'Theorem 3.10',
          content: '$A \\in \\mathbb{R}^{m \\times n}$ is injective $\\Longleftrightarrow$ its columns $\\mathbf{a}_1, \\ldots, \\mathbf{a}_n$ are linearly independent.',
        },
      ],
      whyItMatters: {
        context: 'This connects the algebraic notion (independence) to the functional notion (injectivity) — they are the same thing.',
        applications: [
          'Testing linear independence of measurements = testing injectivity of the measurement matrix',
          'Removing dependent columns from a dataset = making the data matrix injective',
        ],
      },
      resources: [
        {
          title: 'Independence and injectivity',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=9kW6zFK5E5c',
          durationMinutes: 13,
          description: 'Linear independence and the null space connection.',
        },
      ],
      quiz: [
        {
          id: '3-10-q1',
          type: 'true-false',
          question: 'If the columns of $A$ are linearly dependent, then $A$ is not injective.',
          correctAnswer: true,
          explanation: 'Dependent columns mean $c_1\\mathbf{a}_1 + \\cdots + c_n\\mathbf{a}_n = \\mathbf{0}$ has a nontrivial solution, which is $A\\mathbf{c} = \\mathbf{0}$ for $\\mathbf{c} \\neq \\mathbf{0}$. So the null space is nontrivial, hence not injective.',
        },
      ],
      commonMistakes: [
        'Thinking column independence is a geometric property with no algebraic meaning — it is equivalent to injectivity.',
      ],
    },
    {
      id: '3-11',
      chapterId: '3',
      sectionNumber: '3.11',
      title: 'Bijectivity and Square Matrices',
      estimatedMinutes: 9,
      plainEnglish: [
        'A map is **bijective** if it is both injective and surjective — every output is reached, and each output has exactly one pre-image. Bijections have inverses.',
        'For $A: \\mathbb{R}^n \\to \\mathbb{R}^m$ to be bijective, we need both $m = \\text{Rank}(A)$ (surjective) and $\\text{Nullity}(A) = 0$ (injective). By the Rank-Nullity theorem (Section 3.17), this forces $m = n$: square matrices.',
        'So: only square matrices can be bijective. And for a square $n \\times n$ matrix, surjectivity $\\Leftrightarrow$ injectivity $\\Leftrightarrow$ bijectivity. You only need to check one.',
      ],
      formalView: [
        {
          type: 'theorem',
          label: 'Theorem 3.11 (Collapse Theorem)',
          content: 'For a square matrix $A \\in \\mathbb{R}^{n \\times n}$: $$A \\text{ injective} \\Longleftrightarrow A \\text{ surjective} \\Longleftrightarrow A \\text{ bijective}$$ This equivalence fails for non-square matrices.',
        },
      ],
      whyItMatters: {
        context: 'The Collapse Theorem is what makes square matrices special — one condition implies all.',
        applications: [
          'For square linear systems: unique solution iff the coefficient matrix is bijective iff it is invertible',
          'In cryptography, bijective linear maps over finite fields are used in block ciphers',
        ],
      },
      resources: [
        {
          title: 'Bijective functions and inverses',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=yp48Z6OcLpk',
          durationMinutes: 10,
          description: 'Bijections, bijective functions, and invertibility.',
        },
      ],
      quiz: [
        {
          id: '3-11-q1',
          type: 'true-false',
          question: 'A $3 \\times 3$ matrix with rank 2 is bijective.',
          correctAnswer: false,
          explanation: 'Rank 2 < $n$ = 3, so not surjective (and by the Collapse Theorem, also not injective or bijective). For a $3 \\times 3$ matrix to be bijective, rank must be 3.',
        },
      ],
      commonMistakes: [
        'Applying the Collapse Theorem to non-square matrices — it ONLY holds for square matrices.',
        'Thinking bijectivity is harder to check than surjectivity or injectivity for square matrices — they are equivalent.',
      ],
    },
    {
      id: '3-12',
      chapterId: '3',
      sectionNumber: '3.12',
      title: 'The Collapse Theorem',
      estimatedMinutes: 8,
      plainEnglish: [
        'The Collapse Theorem for square matrices is really a consequence of counting: for $A \\in \\mathbb{R}^{n \\times n}$, we have $n$ inputs and $n$ outputs. If the map doesn\'t collapse (injective), it must cover everything (surjective) — because a faithful map on a finite-dimensional space from itself to itself can\'t "miss" anything.',
        'More precisely: $\\text{Rank}(A) + \\text{Nullity}(A) = n$. If $\\text{Nullity}(A) = 0$, then $\\text{Rank}(A) = n = m$, so the map is also surjective. And vice versa.',
        'This is analogous to: a function from a finite set to itself is injective iff it is surjective (pigeonhole principle). Linearity and finite-dimensionality make this work.',
      ],
      formalView: [
        {
          type: 'corollary',
          label: 'Corollary 3.12',
          content: 'For $A \\in \\mathbb{R}^{n \\times n}$: $\\text{Rank}(A) = n \\Longleftrightarrow \\text{Nullity}(A) = 0 \\Longleftrightarrow A$ is bijective.',
        },
      ],
      whyItMatters: {
        context: 'The Collapse Theorem dramatically simplifies work with square matrices — checking one property gives all.',
        applications: [
          'To verify a square system $A\\mathbf{x} = \\mathbf{b}$ has a unique solution for all $\\mathbf{b}$: just check the null space',
          'Matrix invertibility (Chapter 4) is exactly bijectivity of the associated map',
        ],
      },
      resources: [
        {
          title: 'The Invertible Matrix Theorem',
          channel: '3Blue1Brown',
          url: 'https://www.youtube.com/watch?v=uQhTuRlWMxw',
          durationMinutes: 10,
          description: 'All the equivalent conditions for invertibility unified.',
        },
      ],
      quiz: [
        {
          id: '3-12-q1',
          type: 'multiple-choice',
          question: 'For a square matrix $A$, $\\text{Nullity}(A) = 0$ implies:',
          options: ['$A$ is surjective only', '$A$ is injective only', '$A$ is both injective and surjective', 'Nothing about surjectivity'],
          correctAnswer: 2,
          explanation: 'For square matrices, injectivity $\\Leftrightarrow$ surjectivity. $\\text{Nullity} = 0$ means injective, which implies surjective for square $A$.',
        },
      ],
      commonMistakes: [
        'Applying "injective implies surjective" to rectangular matrices — only valid for square matrices.',
      ],
    },
    {
      id: '3-13',
      chapterId: '3',
      sectionNumber: '3.13',
      title: 'Linear Systems as Matrix Equations',
      estimatedMinutes: 8,
      plainEnglish: [
        'We can now fully connect the world of linear systems (Chapter 1) to the world of matrices. The system $A\\mathbf{x} = \\mathbf{b}$ asks: is $\\mathbf{b}$ in the column space of $A$? If yes, any $\\mathbf{x}$ such that $A\\mathbf{x} = \\mathbf{b}$ is a solution.',
        'Solving a linear system = finding the pre-image of $\\mathbf{b}$ under the linear map $A$. The solution set is $\\mathbf{x}_p + \\text{Null}(A)$ where $\\mathbf{x}_p$ is any particular solution.',
        'This unifies everything from Chapter 1: the trichotomy (no/unique/infinite solutions) corresponds to $\\mathbf{b} \\notin \\text{Col}(A)$ / $\\mathbf{b} \\in \\text{Col}(A)$ and $\\text{Nullity}(A) = 0$ / $\\mathbf{b} \\in \\text{Col}(A)$ and $\\text{Nullity}(A) > 0$.',
      ],
      formalView: [
        {
          type: 'theorem',
          label: 'Theorem 3.13',
          title: 'Solvability Criterion',
          content: 'The system $A\\mathbf{x} = \\mathbf{b}$ is solvable if and only if $\\mathbf{b} \\in \\text{Col}(A)$. When solvable, the complete solution set is $\\{\\mathbf{x}_p + \\mathbf{n} : \\mathbf{n} \\in \\text{Null}(A)\\}$ for any particular solution $\\mathbf{x}_p$.',
        },
      ],
      whyItMatters: {
        context: 'Expressing solvability in terms of column space membership is the geometric key to the theory.',
        applications: [
          'Before solving, check solvability: is $\\mathbf{b}$ in the column span?',
          'The particular + homogeneous solution structure is universal — it appears in differential equations too',
        ],
      },
      resources: [
        {
          title: 'Solving $Ax = b$',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=qgyuH93h1no',
          durationMinutes: 51,
          description: 'Complete solution of $Ax=b$: particular solution + null space.',
        },
      ],
      quiz: [
        {
          id: '3-13-q1',
          type: 'true-false',
          question: 'If $A\\mathbf{x} = \\mathbf{b}$ has two solutions $\\mathbf{x}_1$ and $\\mathbf{x}_2$, then $\\mathbf{x}_1 - \\mathbf{x}_2 \\in \\text{Null}(A)$.',
          correctAnswer: true,
          explanation: '$A\\mathbf{x}_1 = \\mathbf{b}$ and $A\\mathbf{x}_2 = \\mathbf{b}$, so $A(\\mathbf{x}_1 - \\mathbf{x}_2) = \\mathbf{0}$, meaning $\\mathbf{x}_1 - \\mathbf{x}_2 \\in \\text{Null}(A)$.',
        },
      ],
      commonMistakes: [
        'Thinking "any particular solution" means a unique choice — there are infinitely many when Nullity > 0.',
      ],
    },
    {
      id: '3-14',
      chapterId: '3',
      sectionNumber: '3.14',
      title: 'Solvability: When Does Ax = b Have a Solution?',
      estimatedMinutes: 8,
      plainEnglish: [
        'The system $A\\mathbf{x} = \\mathbf{b}$ has a solution if and only if $\\mathbf{b}$ lies in the column space of $A$. Operationally, we check this by row-reducing the augmented matrix $[A | \\mathbf{b}]$ and looking for contradictory rows.',
        'A contradictory row $[0, 0, \\ldots, 0 | c]$ with $c \\neq 0$ signals that $\\mathbf{b}$ is NOT in $\\text{Col}(A)$ — the system is inconsistent.',
        'If no contradiction arises, $\\mathbf{b} \\in \\text{Col}(A)$ and the system is consistent. The solution is found by back substitution, with free variables parametrizing the null space.',
      ],
      formalView: [
        {
          type: 'theorem',
          label: 'Theorem 3.14',
          content: 'The augmented system $[A | \\mathbf{b}]$ row-reduces to a system with no contradictory row $\\Longleftrightarrow$ $\\mathbf{b} \\in \\text{Col}(A)$ $\\Longleftrightarrow$ $A\\mathbf{x} = \\mathbf{b}$ is consistent.',
        },
      ],
      whyItMatters: {
        context: 'The solvability check is the first step in any practical linear algebra computation.',
        applications: [
          'Before running any solver, verify the system is consistent',
          'In optimization, infeasibility detection saves computational effort',
        ],
      },
      resources: [
        {
          title: 'Consistency and solvability of linear systems',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=JVDrlTdzxiI',
          durationMinutes: 13,
          description: 'Augmented matrix and solvability criterion.',
        },
      ],
      quiz: [
        {
          id: '3-14-q1',
          type: 'multiple-choice',
          question: 'During row reduction of $[A|\\mathbf{b}]$ you get the row $[0, 0, 0 | 3]$. The system is:',
          options: ['Consistent with infinitely many solutions', 'Consistent with a unique solution', 'Inconsistent (no solution)', 'Consistent but underdetermined'],
          correctAnswer: 2,
          explanation: 'The row $[0,0,0|3]$ represents $0=3$, a contradiction. The system is inconsistent — no solution exists.',
        },
      ],
      commonMistakes: [
        'Stopping row reduction before checking all rows for contradictions.',
        'Assuming a system with many equations is more likely to be solvable — more constraints can only reduce solvability.',
      ],
    },
    {
      id: '3-15',
      chapterId: '3',
      sectionNumber: '3.15',
      title: 'Homogeneous and Inhomogeneous Systems',
      estimatedMinutes: 8,
      plainEnglish: [
        'The **homogeneous system** is $A\\mathbf{x} = \\mathbf{0}$ — right-hand side is the zero vector. It is always consistent (trivial solution $\\mathbf{x} = \\mathbf{0}$), and its solution set is the null space $\\text{Null}(A)$ — a subspace.',
        'The **inhomogeneous system** is $A\\mathbf{x} = \\mathbf{b}$ with $\\mathbf{b} \\neq \\mathbf{0}$. When consistent, its solution set is $\\mathbf{x}_p + \\text{Null}(A)$ — an affine set.',
        'The connection: the inhomogeneous solution set is a "shift" of the homogeneous solution set. Understanding $\\text{Null}(A)$ is half the battle in solving any system.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 3.15',
          content: '**Homogeneous system:** $A\\mathbf{x} = \\mathbf{0}$; solution set is $\\text{Null}(A)$ (a subspace). **Inhomogeneous system:** $A\\mathbf{x} = \\mathbf{b}$ with $\\mathbf{b} \\neq \\mathbf{0}$; solution set (if nonempty) is $\\mathbf{x}_p + \\text{Null}(A)$ (an affine set).',
        },
      ],
      whyItMatters: {
        context: 'The homogeneous/inhomogeneous split is universal — it appears in differential equations, optimization, and control.',
        applications: [
          'In differential equations, the homogeneous solution is the "transient" and the particular solution is the "steady state"',
          'Residuals in least squares are vectors in the null space of the constraint matrix',
        ],
      },
      resources: [
        {
          title: 'Homogeneous and particular solutions',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=qgyuH93h1no',
          durationMinutes: 51,
          description: 'General solution = particular + homogeneous.',
        },
      ],
      quiz: [
        {
          id: '3-15-q1',
          type: 'true-false',
          question: 'The homogeneous system $A\\mathbf{x} = \\mathbf{0}$ always has at least one solution.',
          correctAnswer: true,
          explanation: '$\\mathbf{x} = \\mathbf{0}$ always satisfies $A\\mathbf{0} = \\mathbf{0}$. The homogeneous system is always consistent.',
        },
      ],
      commonMistakes: [
        'Thinking the homogeneous solution $\\mathbf{0}$ is the only solution — there may be a whole subspace of solutions (the null space).',
      ],
    },
    {
      id: '3-16',
      chapterId: '3',
      sectionNumber: '3.16',
      title: 'Solution Set Structure',
      estimatedMinutes: 8,
      plainEnglish: [
        'Putting it all together: the solution set of $A\\mathbf{x} = \\mathbf{b}$ is empty (if inconsistent), a subspace (if $\\mathbf{b} = \\mathbf{0}$), or an affine set (if $\\mathbf{b} \\neq \\mathbf{0}$ and consistent). The dimension of the solution set always equals the nullity of $A$.',
        'To find the general solution: first find any particular solution $\\mathbf{x}_p$ (one specific $\\mathbf{x}$ with $A\\mathbf{x}_p = \\mathbf{b}$), then find a basis for $\\text{Null}(A)$. The general solution is $\\mathbf{x}_p + c_1\\mathbf{n}_1 + \\cdots + c_k\\mathbf{n}_k$ where $\\mathbf{n}_i$ are null space basis vectors and $c_i$ are arbitrary.',
        'This is exactly the same structure as the solution of a linear ODE: general = particular + homogeneous.',
      ],
      formalView: [
        {
          type: 'theorem',
          label: 'Theorem 3.16',
          title: 'Complete Solution Structure',
          content: 'If $A\\mathbf{x} = \\mathbf{b}$ is consistent with particular solution $\\mathbf{x}_p$ and $\\{\\mathbf{n}_1, \\ldots, \\mathbf{n}_k\\}$ is a basis for $\\text{Null}(A)$, then every solution has the form $$\\mathbf{x} = \\mathbf{x}_p + c_1\\mathbf{n}_1 + \\cdots + c_k\\mathbf{n}_k$$ for arbitrary $c_1, \\ldots, c_k \\in \\mathbb{R}$. The solution set is $k$-dimensional ($k = \\text{Nullity}(A)$).',
        },
      ],
      whyItMatters: {
        context: 'This structure theorem is universal — it describes solution sets in every area of mathematics.',
        applications: [
          'Underdetermined systems (more unknowns than equations) have infinitely many solutions parameterized by free variables',
          'In circuit analysis, loop currents are parameterized by independent loop equations',
        ],
      },
      resources: [
        {
          title: 'Complete solution to $Ax = b$',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=qgyuH93h1no',
          durationMinutes: 51,
          description: 'Complete solution structure: particular + null space.',
        },
      ],
      quiz: [
        {
          id: '3-16-q1',
          type: 'multiple-choice',
          question: 'A consistent system $A\\mathbf{x} = \\mathbf{b}$ with Nullity($A$) = 3 has solution set of dimension:',
          options: ['0', '1', '3', 'Depends on $\\mathbf{b}$'],
          correctAnswer: 2,
          explanation: 'The solution set is $\\mathbf{x}_p + \\text{Null}(A)$, which has the same dimension as Null($A$) = 3. It does not depend on $\\mathbf{b}$ (as long as the system is consistent).',
        },
      ],
      commonMistakes: [
        'Thinking the dimension of the solution set depends on $\\mathbf{b}$ — it only depends on Nullity($A$).',
      ],
    },
    {
      id: '3-17',
      chapterId: '3',
      sectionNumber: '3.17',
      title: 'The Rank-Nullity Theorem',
      estimatedMinutes: 12,
      plainEnglish: [
        'The **Rank-Nullity Theorem** is one of the most important results in linear algebra: for any $m \\times n$ matrix $A$, $$\\text{Rank}(A) + \\text{Nullity}(A) = n$$ The number of pivots plus the number of free variables always equals the total number of unknowns.',
        'Geometrically: the domain $\\mathbb{R}^n$ is split into two parts. The part that "goes to zero" (the null space, of dimension Nullity($A$)) and the part that "survives" and contributes to the output (of dimension Rank($A$)). These two dimensions must add up to $n$.',
        'A corollary: if $A$ is $m \\times n$, then Rank($A$) $\\leq \\min(m, n)$. A $3 \\times 5$ matrix has rank at most 3; nullity at least 2.',
      ],
      formalView: [
        {
          type: 'theorem',
          label: 'Theorem 3.17 (Rank-Nullity)',
          content: 'For any matrix $A \\in \\mathbb{R}^{m \\times n}$: $$\\text{Rank}(A) + \\text{Nullity}(A) = n$$ Equivalently, $\\dim(\\text{Col}(A)) + \\dim(\\text{Null}(A)) = n = $ (number of columns).',
          note: 'This is sometimes called the "Fundamental Theorem of Linear Algebra" (first part).',
        },
      ],
      diagram: {
        type: 'RankNullityVisualizer',
        props: { initialMatrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] },
      },
      whyItMatters: {
        context: 'Rank-Nullity connects geometry (dimension) to computation (number of pivots and free variables) and provides fundamental constraints.',
        applications: [
          'In control theory: Rank-Nullity tells you how many states are controllable vs. uncontrollable',
          'In statistics: Rank-Nullity explains degrees of freedom in linear regression',
          'Hyperplane corollary: any single linear equation $\\mathbf{a}^T\\mathbf{x} = 0$ defines a subspace of dimension $n-1$',
        ],
      },
      resources: [
        {
          title: 'Rank-Nullity theorem',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=yjBerM-GKYE',
          durationMinutes: 49,
          description: 'Proof and interpretation of the Rank-Nullity theorem.',
        },
        {
          title: 'The four fundamental subspaces',
          channel: '3Blue1Brown',
          url: 'https://www.youtube.com/watch?v=uQhTuRlWMxw',
          durationMinutes: 10,
          description: 'How rank and nullity relate geometrically.',
        },
      ],
      quiz: [
        {
          id: '3-17-q1',
          type: 'multiple-choice',
          question: 'Matrix $A$ is $5 \\times 8$ with rank 3. What is Nullity($A$)?',
          options: ['5', '3', '2', '5'],
          correctAnswer: 1,
          explanation: 'Rank-Nullity: Nullity($A$) = $n$ - Rank($A$) = $8 - 3 = 5$. (Note: $n$ = number of columns = 8.)',
        },
        {
          id: '3-17-q2',
          type: 'true-false',
          question: 'A $3 \\times 3$ matrix with rank 3 has nullity 0.',
          correctAnswer: true,
          explanation: 'Rank-Nullity: Nullity = $n$ - Rank = $3 - 3 = 0$. Full rank square matrix has trivial null space.',
        },
      ],
      commonMistakes: [
        'Using $m$ (number of rows) instead of $n$ (number of columns) in the formula Rank + Nullity = $n$.',
        'Confusing Rank of $A$ (dim of column space) with number of rows $m$ — these can differ.',
      ],
    },
  ],
};

export default chapter3;
