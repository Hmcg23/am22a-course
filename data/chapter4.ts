import type { ChapterMeta } from './types';

const chapter4: ChapterMeta = {
  id: '4',
  title: 'Matrix Algebra and Invertibility',
  subtitle: 'Composition, Products, and LU Decomposition',
  description: 'Master matrix multiplication as composition of transformations, understand invertibility through 10 equivalent conditions, and learn the LU decomposition algorithm.',
  color: 'rose',
  accentHex: '#F43F5E',
  sections: [
    {
      id: '4-1',
      chapterId: '4',
      sectionNumber: '4.1',
      title: 'Composition of Linear Maps',
      estimatedMinutes: 10,
      plainEnglish: [
        'When we apply two linear maps in sequence — first $B$, then $A$ — the result is their **composition** $(A \\circ B)(\\mathbf{v}) = A(B\\mathbf{v})$. The composition of two linear maps is itself a linear map.',
        'This is the conceptual origin of matrix multiplication. If $B: \\mathbb{R}^p \\to \\mathbb{R}^n$ and $A: \\mathbb{R}^n \\to \\mathbb{R}^m$, then $A \\circ B: \\mathbb{R}^p \\to \\mathbb{R}^m$. The inner dimensions $n$ must match — this is exactly the dimension-matching rule for matrix multiplication.',
        'Why study composition? Because in practice, transformations are always chained: rotate then scale, project then filter, encode then decode. Each step is a matrix; chaining steps is matrix multiplication.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 4.1',
          title: 'Composition',
          content: 'If $B: \\mathbb{R}^p \\to \\mathbb{R}^n$ and $A: \\mathbb{R}^n \\to \\mathbb{R}^m$ are linear maps, their **composition** is $(A \\circ B): \\mathbb{R}^p \\to \\mathbb{R}^m$ defined by $(A \\circ B)(\\mathbf{v}) = A(B\\mathbf{v})$. This map is also linear.',
        },
      ],
      diagram: {
        type: 'TransformationComposition',
        props: {
          matrixA: [[0, -1], [1, 0]],
          matrixB: [[2, 0], [0, 2]],
        },
      },
      whyItMatters: {
        context: 'Composition is the mathematical model of "apply transformation A after transformation B."',
        applications: [
          'Computer graphics: model → world → camera → clip → screen space are 4 successive matrix multiplications',
          'Neural networks: each layer applies a linear map, and forward pass is a composition of all layers',
          'Signal processing: cascaded filters correspond to composed linear maps',
        ],
      },
      resources: [
        {
          title: 'Matrix multiplication as composition',
          channel: '3Blue1Brown',
          url: 'https://www.youtube.com/watch?v=XkY2DOUCWMU',
          durationMinutes: 10,
          description: 'The geometric meaning of matrix multiplication as composition of transformations.',
        },
      ],
      quiz: [
        {
          id: '4-1-q1',
          type: 'true-false',
          question: 'The composition of two linear maps is always a linear map.',
          correctAnswer: true,
          explanation: 'If $A$ and $B$ are linear, then $(A \\circ B)(c\\mathbf{u} + \\mathbf{v}) = A(B(c\\mathbf{u} + \\mathbf{v})) = A(cB\\mathbf{u} + B\\mathbf{v}) = cA(B\\mathbf{u}) + A(B\\mathbf{v}) = c(A\\circ B)(\\mathbf{u}) + (A\\circ B)(\\mathbf{v})$.',
        },
      ],
      commonMistakes: [
        'Thinking $(A \\circ B)\\mathbf{v} = A\\mathbf{v}$ then $B$ of the result — composition applies $B$ FIRST, then $A$.',
        'Ignoring dimension compatibility — $B$ must output vectors that $A$ can accept as input.',
      ],
    },
    {
      id: '4-2',
      chapterId: '4',
      sectionNumber: '4.2',
      title: 'Defining Matrix-Matrix Multiplication',
      estimatedMinutes: 10,
      plainEnglish: [
        'The **matrix product** $C = AB$ is defined so that $C$ represents the composition of the linear maps represented by $A$ and $B$. Specifically: $C\\mathbf{v} = A(B\\mathbf{v})$ for all $\\mathbf{v}$.',
        'This definition immediately gives us the size rule: if $A$ is $m \\times n$ and $B$ is $n \\times p$, then $C = AB$ is $m \\times p$. The inner dimension $n$ is "consumed" — it represents the intermediate space where $B$ outputs and $A$ inputs.',
        'The product is only defined when the number of columns of $A$ equals the number of rows of $B$. This is not a convention — it\'s forced by the composition definition.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 4.2',
          title: 'Matrix Product',
          content: 'For $A \\in \\mathbb{R}^{m \\times n}$ and $B \\in \\mathbb{R}^{n \\times p}$, the **matrix product** $C = AB \\in \\mathbb{R}^{m \\times p}$ is the unique matrix satisfying $C\\mathbf{v} = A(B\\mathbf{v})$ for all $\\mathbf{v} \\in \\mathbb{R}^p$.',
        },
      ],
      whyItMatters: {
        context: 'Understanding that AB = "do B first, then A" is the key to using matrix multiplication correctly.',
        applications: [
          'In deep learning, $AB$ where $B$ encodes features and $A$ classifies: compose the two operations',
          '3D transformation matrices: $\\text{Rotate} \\cdot \\text{Scale}$ applies scale first, then rotation',
        ],
      },
      resources: [
        {
          title: 'Matrix multiplication',
          channel: '3Blue1Brown',
          url: 'https://www.youtube.com/watch?v=XkY2DOUCWMU',
          durationMinutes: 10,
          description: 'Why matrix multiplication is defined the way it is.',
        },
      ],
      quiz: [
        {
          id: '4-2-q1',
          type: 'multiple-choice',
          question: 'Can we compute $AB$ if $A$ is $3 \\times 4$ and $B$ is $3 \\times 2$?',
          options: ['Yes, result is $3 \\times 2$', 'Yes, result is $4 \\times 2$', 'No, inner dimensions do not match', 'Yes, result is $3 \\times 3$'],
          correctAnswer: 2,
          explanation: 'For $AB$: columns of $A$ (= 4) must equal rows of $B$ (= 3). Here $4 \\neq 3$, so $AB$ is not defined.',
        },
      ],
      commonMistakes: [
        'Checking the wrong dimensions — columns of $A$ must match rows of $B$, not rows of $A$ with rows of $B$.',
      ],
    },
    {
      id: '4-3',
      chapterId: '4',
      sectionNumber: '4.3',
      title: 'The Column Perspective on Matrix Products',
      estimatedMinutes: 10,
      plainEnglish: [
        'The most geometric way to understand $C = AB$ is column-by-column. Each column of $C$ is the result of multiplying $A$ by the corresponding column of $B$: $\\mathbf{c}_j = A\\mathbf{b}_j$.',
        'So $C = AB$ means: take each column of $B$, multiply it by $A$, and the results become the columns of $C$. This is $n$ separate matrix-vector multiplications.',
        'This perspective makes the composition story concrete: the $j$-th column of $B$ tells us "where the $j$-th basis vector goes under $B$." Then $A$ transforms that destination. The result is where the $j$-th basis vector goes under the composition $AB$.',
      ],
      formalView: [
        {
          type: 'theorem',
          label: 'Theorem 4.3 (Column Form)',
          content: 'If $C = AB$, then the $j$-th column of $C$ is $$\\mathbf{c}_j = A \\mathbf{b}_j$$ where $\\mathbf{b}_j$ is the $j$-th column of $B$.',
        },
      ],
      diagram: {
        type: 'MatrixProductAnimator',
        props: {
          matrixA: [[1, 2], [3, 4], [5, 6]],
          matrixB: [[1, 0], [0, 1]],
        },
      },
      whyItMatters: {
        context: 'The column perspective makes it clear that each column of AB is independently computed via matrix-vector products.',
        applications: [
          'Parallelization: each column of $AB$ can be computed independently on separate processors',
          'Sparse matrix products: if $B$ has many zero columns, those columns of $C$ are immediately zero',
        ],
      },
      resources: [
        {
          title: 'Column view of matrix multiplication',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=FX4C-JpTFgY',
          durationMinutes: 39,
          description: 'Five different ways to view matrix multiplication.',
        },
      ],
      quiz: [
        {
          id: '4-3-q1',
          type: 'true-false',
          question: 'The second column of $AB$ equals $A$ times the second column of $B$.',
          correctAnswer: true,
          explanation: 'By the column form: $\\mathbf{c}_2 = A\\mathbf{b}_2$. The columns of $C$ are computed column-by-column by multiplying $A$ by each column of $B$.',
        },
      ],
      commonMistakes: [
        'Computing $AB$ by multiplying each row of $A$ with each column of $B$ when the column perspective is clearer.',
      ],
    },
    {
      id: '4-4',
      chapterId: '4',
      sectionNumber: '4.4',
      title: 'The Entry Perspective: Dot Products',
      estimatedMinutes: 9,
      plainEnglish: [
        'The computational formula for matrix multiplication: the $(i,j)$ entry of $C = AB$ is the **dot product** of row $i$ of $A$ with column $j$ of $B$: $c_{ij} = \\sum_k a_{ik} b_{kj}$.',
        'This is the "two-finger rule" — point one finger at row $i$ of $A$ and the other at column $j$ of $B$, multiply corresponding entries, and sum. Slide fingers to compute each entry.',
        'While this formula is less geometric than the column perspective, it is essential for computation and for understanding why the time complexity is $O(n^3)$: there are $mp$ entries to compute, each requiring a dot product of length $n$.',
      ],
      formalView: [
        {
          type: 'theorem',
          label: 'Theorem 4.4 (Entry Form)',
          content: 'For $C = AB$ with $A \\in \\mathbb{R}^{m \\times n}$, $B \\in \\mathbb{R}^{n \\times p}$: $$c_{ij} = \\sum_{k=1}^n a_{ik} b_{kj} = \\mathbf{a}_{i \\cdot} \\cdot \\mathbf{b}_{\\cdot j}$$ where $\\mathbf{a}_{i\\cdot}$ is row $i$ of $A$ and $\\mathbf{b}_{\\cdot j}$ is column $j$ of $B$.',
        },
        {
          type: 'remark',
          label: 'Remark 4.4',
          title: 'Complexity',
          content: 'Computing $C = AB$ naively requires $O(mnp)$ multiplications. For square $n \\times n$ matrices, this is $O(n^3)$. Strassen\'s algorithm achieves $O(n^{2.81})$; current theoretical best is $O(n^{2.37...})$.',
        },
      ],
      whyItMatters: {
        context: 'The entry formula is the basis for all numerical linear algebra implementations.',
        applications: [
          'BLAS (Basic Linear Algebra Subprograms) implements this formula with SIMD optimizations',
          'GPU matrix multiplication runs the entry formula in massively parallel fashion',
          'Understanding $O(n^3)$ cost helps design algorithms that avoid recomputing products',
        ],
      },
      resources: [
        {
          title: 'Matrix multiplication algorithm',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=OAh573i_qn8',
          durationMinutes: 13,
          description: 'Step-by-step computation of matrix products.',
        },
      ],
      quiz: [
        {
          id: '4-4-q1',
          type: 'multiple-choice',
          question: 'For $C = AB$ with $A \\in \\mathbb{R}^{2 \\times 3}$ and $B \\in \\mathbb{R}^{3 \\times 2}$, the entry $c_{21}$ is computed as:',
          options: [
            'Row 1 of $A$ dotted with column 2 of $B$',
            'Row 2 of $A$ dotted with column 1 of $B$',
            'Column 2 of $A$ dotted with row 1 of $B$',
            'Row 2 of $A$ dotted with row 1 of $B$',
          ],
          correctAnswer: 1,
          explanation: '$c_{ij}$ uses row $i$ of $A$ and column $j$ of $B$. So $c_{21}$ uses row $2$ of $A$ and column $1$ of $B$.',
        },
      ],
      commonMistakes: [
        'Using the wrong row/column pairing — $c_{ij}$ is row $i$ of $A$ dotted with column $j$ of $B$.',
        'Forgetting to sum over the inner index $k$ from 1 to $n$.',
      ],
    },
    {
      id: '4-5',
      chapterId: '4',
      sectionNumber: '4.5',
      title: 'Algebraic Properties of Matrix Multiplication',
      estimatedMinutes: 9,
      plainEnglish: [
        'Matrix multiplication satisfies several familiar algebraic properties, but with important differences from scalar multiplication.',
        '**Works:** Associativity: $(AB)C = A(BC)$. Distributivity: $A(B+C) = AB + AC$ and $(B+C)A = BA + CA$. Identity: $I_mA = A = AI_n$. Scalar: $r(AB) = (rA)B = A(rB)$.',
        '**Does NOT work in general:** Commutativity ($AB \\neq BA$ in general), cancellation ($AB = AC$ does not imply $B = C$), zero products ($AB = 0$ does not imply $A = 0$ or $B = 0$).',
      ],
      formalView: [
        {
          type: 'theorem',
          label: 'Theorem 4.5',
          title: 'Properties of Matrix Multiplication',
          content: 'Let $A, B, C$ be matrices of compatible dimensions and $r \\in \\mathbb{R}$: \\begin{enumerate} \\item $(AB)C = A(BC)$ (associativity) \\item $A(B + C) = AB + AC$ (left distributivity) \\item $(B + C)A = BA + CA$ (right distributivity) \\item $I_m A = A$ and $A I_n = A$ (identity) \\item $r(AB) = (rA)B = A(rB)$ (scalar compatibility) \\end{enumerate}',
        },
      ],
      whyItMatters: {
        context: 'These properties justify algebraic manipulation of matrix expressions.',
        applications: [
          'Associativity allows us to evaluate $(AB)C$ or $A(BC)$ — whichever is cheaper',
          'Distributivity enables expanding matrix polynomials like $(A+B)^2 = A^2 + AB + BA + B^2$ (note: $AB \\neq BA$!)',
        ],
      },
      resources: [
        {
          title: 'Properties of matrix multiplication',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=aKhhYguY0DQ',
          durationMinutes: 11,
          description: 'Associativity, distributivity, and the identity matrix.',
        },
      ],
      quiz: [
        {
          id: '4-5-q1',
          type: 'true-false',
          question: 'For all matrices $A$ and $B$, $(A+B)^2 = A^2 + 2AB + B^2$.',
          correctAnswer: false,
          explanation: '$(A+B)^2 = A^2 + AB + BA + B^2 \\neq A^2 + 2AB + B^2$ in general because $AB \\neq BA$.',
        },
      ],
      commonMistakes: [
        'Treating matrix algebra like scalar algebra — especially the commutativity assumption.',
        'Thinking $(AB)^T = A^T B^T$ — the correct formula is $(AB)^T = B^T A^T$ (order reverses).',
      ],
    },
    {
      id: '4-6',
      chapterId: '4',
      sectionNumber: '4.6',
      title: 'Caveats: Non-Commutativity and Zero Products',
      estimatedMinutes: 8,
      plainEnglish: [
        '**Non-commutativity:** $AB \\neq BA$ in general, even for square matrices. A simple example: rotate then scale is different from scale then rotate (if scales are non-uniform). This is the most important difference from scalar arithmetic.',
        '**Zero products:** For scalars, $ab = 0$ implies $a = 0$ or $b = 0$. For matrices this fails: $AB$ can be the zero matrix with $A \\neq 0$ and $B \\neq 0$. This happens when the columns of $B$ all lie in the null space of $A$.',
        '**No cancellation:** $AB = AC$ does NOT imply $B = C$ (unless $A$ is invertible). Similarly $BA = CA$ does not imply $B = C$.',
      ],
      formalView: [
        {
          type: 'example',
          label: 'Example 4.6',
          title: 'Zero Product of Nonzero Matrices',
          content: '$A = \\begin{pmatrix}0 & 1\\\\0 & 0\\end{pmatrix}$, $B = \\begin{pmatrix}1 & 0\\\\0 & 0\\end{pmatrix}$. Then $AB = \\begin{pmatrix}0 & 0\\\\0 & 0\\end{pmatrix}$ even though $A \\neq 0$ and $B \\neq 0$.',
        },
      ],
      whyItMatters: {
        context: 'These failures of familiar algebra cause subtle bugs in matrix computations and derivations.',
        applications: [
          'In programming: matrix product order in shader code critically affects 3D rendering',
          'In quantum mechanics: operator order (commutators) determines observable properties',
          'Numerical: accumulation of rounding errors differs between $(AB)C$ and $A(BC)$ despite mathematical equality',
        ],
      },
      resources: [
        {
          title: 'Non-commutativity of matrices',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=aKhhYguY0DQ',
          durationMinutes: 11,
          description: 'Why $AB \\neq BA$ and examples.',
        },
      ],
      quiz: [
        {
          id: '4-6-q1',
          type: 'true-false',
          question: 'If $AB = 0$, then either $A = 0$ or $B = 0$.',
          correctAnswer: false,
          explanation: 'This is false for matrices. Nonzero matrices can multiply to give the zero matrix. This happens when $\\text{Col}(B) \\subseteq \\text{Null}(A)$.',
        },
      ],
      commonMistakes: [
        'Applying scalar arithmetic rules ($ab = ba$, $ab = 0 \\Rightarrow a = 0$) to matrices.',
        'Canceling matrices from both sides of an equation without checking invertibility.',
      ],
    },
    {
      id: '4-7',
      chapterId: '4',
      sectionNumber: '4.7',
      title: 'Rank of a Product',
      estimatedMinutes: 9,
      plainEnglish: [
        'How does multiplication affect rank? Two fundamental inequalities: $\\text{Rank}(AB) \\leq \\text{Rank}(A)$ and $\\text{Rank}(AB) \\leq \\text{Rank}(B)$.',
        'Geometrically: $\\text{Col}(AB) \\subseteq \\text{Col}(A)$ — the outputs of $AB$ are also outputs of $A$, so $AB$ can\'t exceed $A$\'s rank. Similarly, $\\text{Null}(AB) \\supseteq \\text{Null}(B)$ — anything that $B$ kills, $AB$ also kills.',
        'If either $A$ or $B$ has full rank (is injective or surjective respectively), then multiplying by it doesn\'t reduce rank. In particular, multiplying by an invertible matrix preserves rank.',
      ],
      formalView: [
        {
          type: 'theorem',
          label: 'Theorem 4.7 (Rank Inequalities)',
          content: 'For $A \\in \\mathbb{R}^{m \\times n}$ and $B \\in \\mathbb{R}^{n \\times p}$: \\begin{enumerate} \\item $\\text{Col}(AB) \\subseteq \\text{Col}(A)$, so $\\text{Rank}(AB) \\leq \\text{Rank}(A)$ \\item $\\text{Null}(B) \\subseteq \\text{Null}(AB)$, so $\\text{Nullity}(AB) \\geq \\text{Nullity}(B)$ \\item $\\text{Rank}(AB) \\leq \\min(\\text{Rank}(A), \\text{Rank}(B))$ \\end{enumerate}',
        },
      ],
      whyItMatters: {
        context: 'Rank inequalities for products appear throughout matrix analysis and algorithm design.',
        applications: [
          'Low-rank matrix approximations: if $A = BC$ with $B, C$ low-rank, then $A$ is low-rank',
          'In neural networks, weight matrices at each layer bound the effective rank of learned representations',
          'PCA: the product of a data matrix with its transpose has rank = number of principal components',
        ],
      },
      resources: [
        {
          title: 'Rank of matrix products',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=yjBerM-GKYE',
          durationMinutes: 49,
          description: 'Rank inequalities and the column space inclusion.',
        },
      ],
      quiz: [
        {
          id: '4-7-q1',
          type: 'multiple-choice',
          question: 'If Rank($A$) = 2 and Rank($B$) = 5, what can we say about Rank($AB$)?',
          options: [
            'Rank($AB$) = 10',
            'Rank($AB$) $\\leq 2$',
            'Rank($AB$) $\\leq 5$',
            'Rank($AB$) = 7',
          ],
          correctAnswer: 1,
          explanation: 'Rank($AB$) $\\leq \\min$(Rank($A$), Rank($B$)) = min(2, 5) = 2. The bottleneck is the smaller rank.',
        },
      ],
      commonMistakes: [
        'Thinking rank is multiplicative — Rank($AB$) $\\leq$ min(Rank$A$, Rank$B$), not equal.',
      ],
    },
    {
      id: '4-8',
      chapterId: '4',
      sectionNumber: '4.8',
      title: 'Right Invertibility and Surjectivity',
      estimatedMinutes: 9,
      plainEnglish: [
        'A matrix $A \\in \\mathbb{R}^{m \\times n}$ is **right invertible** if there exists a matrix $R \\in \\mathbb{R}^{n \\times m}$ such that $AR = I_m$. That is, applying $A$ after $R$ gives the identity.',
        'The connection to surjectivity: $A$ is right invertible if and only if $A$ is surjective. Proof: if $AR = I$, then for any $\\mathbf{b} \\in \\mathbb{R}^m$, $A(R\\mathbf{b}) = (AR)\\mathbf{b} = I\\mathbf{b} = \\mathbf{b}$, so $\\mathbf{x} = R\\mathbf{b}$ is a solution. Conversely, right invertibility requires rank $= m$.',
        'The right inverse is a "right undo" — composing $A$ on the right of $R$ recovers the identity. Geometrically: $R$ picks a "section" of $A$ — one pre-image for each output.',
      ],
      formalView: [
        {
          type: 'theorem',
          label: 'Theorem 4.8',
          content: '$A \\in \\mathbb{R}^{m \\times n}$ is right invertible $\\Longleftrightarrow$ $A$ is surjective $\\Longleftrightarrow$ $\\text{Rank}(A) = m$.',
        },
      ],
      whyItMatters: {
        context: 'Right invertibility is the algebraic certificate of surjectivity.',
        applications: [
          'Pseudoinverse: the minimum-norm right inverse of a surjective matrix',
          'Control systems: right invertibility of the control matrix means all states can be reached',
        ],
      },
      resources: [
        {
          title: 'Left and right inverses',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=l88D6yl2ig4',
          durationMinutes: 49,
          description: 'Left and right inverses, and their relationship to injectivity/surjectivity.',
        },
      ],
      quiz: [
        {
          id: '4-8-q1',
          type: 'true-false',
          question: 'A $3 \\times 5$ matrix with rank 3 is right invertible.',
          correctAnswer: true,
          explanation: 'Rank 3 = $m$ = 3, so the matrix is surjective, hence right invertible.',
        },
      ],
      commonMistakes: [
        'Confusing right inverse (undoes $A$ when composed on the right) with left inverse (undoes $A$ when composed on the left).',
      ],
    },
    {
      id: '4-9',
      chapterId: '4',
      sectionNumber: '4.9',
      title: 'Left Invertibility and Injectivity',
      estimatedMinutes: 9,
      plainEnglish: [
        'A matrix $A \\in \\mathbb{R}^{m \\times n}$ is **left invertible** if there exists $L \\in \\mathbb{R}^{n \\times m}$ such that $LA = I_n$. Composing $L$ on the left of $A$ gives the identity.',
        'The connection to injectivity: $A$ is left invertible if and only if $A$ is injective. Proof: $LA = I$ means for any $\\mathbf{x}$ with $A\\mathbf{x} = \\mathbf{0}$, we get $\\mathbf{x} = I\\mathbf{x} = (LA)\\mathbf{x} = L(A\\mathbf{x}) = L\\mathbf{0} = \\mathbf{0}$. So the null space is trivial.',
        'The left inverse "undoes" $A$ — if $A\\mathbf{x} = \\mathbf{b}$, then $\\mathbf{x} = L\\mathbf{b}$. This only works because $A$ is injective: each $\\mathbf{b}$ has at most one pre-image, so the formula is unambiguous.',
      ],
      formalView: [
        {
          type: 'theorem',
          label: 'Theorem 4.9',
          content: '$A \\in \\mathbb{R}^{m \\times n}$ is left invertible $\\Longleftrightarrow$ $A$ is injective $\\Longleftrightarrow$ $\\text{Nullity}(A) = 0$.',
        },
      ],
      whyItMatters: {
        context: 'Left invertibility is the algebraic certificate of injectivity.',
        applications: [
          'Least squares: the pseudoinverse $A^+ = (A^T A)^{-1} A^T$ is a left inverse when $A$ has independent columns',
          'Compressed sensing: measurement matrices must be injective to recover sparse signals uniquely',
        ],
      },
      resources: [
        {
          title: 'Left and right inverses and pseudoinverses',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=l88D6yl2ig4',
          durationMinutes: 49,
          description: 'Left/right inverses and their connection to injectivity/surjectivity.',
        },
      ],
      quiz: [
        {
          id: '4-9-q1',
          type: 'true-false',
          question: 'A $5 \\times 3$ matrix with rank 3 is left invertible.',
          correctAnswer: true,
          explanation: 'Rank 3 = $n$ = 3, so Nullity = $n$ - Rank = 0, meaning the matrix is injective, hence left invertible.',
        },
      ],
      commonMistakes: [
        'Thinking a left inverse means the matrix is square — rectangular injective matrices have left inverses too.',
      ],
    },
    {
      id: '4-10',
      chapterId: '4',
      sectionNumber: '4.10',
      title: 'The Invertible Matrix Theorem',
      estimatedMinutes: 12,
      plainEnglish: [
        'For a **square** matrix $A \\in \\mathbb{R}^{n \\times n}$, there are many equivalent conditions for invertibility — all 10 (or more) are mutually equivalent. Proving any one implies all the others.',
        'Five "injective" conditions: the map is injective, nullity = 0, columns are linearly independent, $A\\mathbf{x} = \\mathbf{0}$ has only the trivial solution, $A$ has a left inverse.',
        'Five "surjective" conditions: the map is surjective, rank = $n$, columns span $\\mathbb{R}^n$, $A\\mathbf{x} = \\mathbf{b}$ always has a solution, $A$ has a right inverse.',
        'For square matrices, all 10 are equivalent (by the Collapse Theorem). When these hold, the left and right inverses coincide — there is a unique two-sided inverse $A^{-1}$.',
      ],
      formalView: [
        {
          type: 'theorem',
          label: 'Theorem 4.10 (Invertible Matrix Theorem)',
          content: 'For $A \\in \\mathbb{R}^{n \\times n}$, the following are all equivalent: \\begin{enumerate} \\item $A$ is injective \\item $\\text{Nullity}(A) = 0$ \\item Columns of $A$ are linearly independent \\item $A\\mathbf{x} = \\mathbf{0}$ has only $\\mathbf{x} = \\mathbf{0}$ \\item $A$ has a left inverse \\item $A$ is surjective \\item $\\text{Rank}(A) = n$ \\item Columns of $A$ span $\\mathbb{R}^n$ \\item $A\\mathbf{x} = \\mathbf{b}$ has a unique solution for every $\\mathbf{b}$ \\item $A$ has a two-sided inverse $A^{-1}$ \\end{enumerate}',
        },
      ],
      diagram: {
        type: 'InvertibleTheoremExplorer',
        props: { matrixSize: 2 },
      },
      whyItMatters: {
        context: 'The Invertible Matrix Theorem is one of the most powerful unifying results in linear algebra — know one property, know all.',
        applications: [
          'Testing invertibility: compute rank, check if $= n$ — much cheaper than finding an inverse explicitly',
          'Eigenvalue characterization: $A$ is invertible iff 0 is not an eigenvalue',
          'In machine learning, invertible weight matrices enable backpropagation without information loss',
        ],
      },
      resources: [
        {
          title: 'The invertible matrix theorem',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=6UqXFRSVF9w',
          durationMinutes: 13,
          description: 'All the equivalent conditions for matrix invertibility.',
        },
        {
          title: 'Inverse matrices, column space and null space',
          channel: '3Blue1Brown',
          url: 'https://www.youtube.com/watch?v=uQhTuRlWMxw',
          durationMinutes: 12,
          description: 'Visualizing invertibility geometrically.',
        },
      ],
      quiz: [
        {
          id: '4-10-q1',
          type: 'multiple-choice',
          question: 'A $4 \\times 4$ matrix has nullity 1. By the Invertible Matrix Theorem, it is:',
          options: ['Invertible', 'Not invertible', 'Surjective but not injective', 'Injective but not surjective'],
          correctAnswer: 1,
          explanation: 'Nullity = 1 $\\neq 0$, so the matrix is NOT injective. By the Collapse Theorem for square matrices, not injective = not surjective = not invertible.',
        },
      ],
      commonMistakes: [
        'Applying the Invertible Matrix Theorem to rectangular matrices — it only holds for square matrices.',
        'Thinking you need to check all 10 conditions — checking any ONE suffices.',
      ],
    },
    {
      id: '4-11',
      chapterId: '4',
      sectionNumber: '4.11',
      title: 'Non-Singular Matrices and Unique Inverses',
      estimatedMinutes: 9,
      plainEnglish: [
        'An invertible square matrix is also called **non-singular**. A non-invertible square matrix is **singular**. The inverse $A^{-1}$ satisfies $A^{-1}A = AA^{-1} = I$.',
        'The inverse is **unique**: if $L$ is a left inverse and $R$ is a right inverse of $A$, then $L = R$ (and so the two-sided inverse is unique). Proof: $L = LI = L(AR) = (LA)R = IR = R$.',
        'Key inverse properties: $(A^{-1})^{-1} = A$, $(AB)^{-1} = B^{-1}A^{-1}$ (note order reversal), $(A^T)^{-1} = (A^{-1})^T$.',
      ],
      formalView: [
        {
          type: 'theorem',
          label: 'Theorem 4.11',
          title: 'Uniqueness and Properties of Inverse',
          content: 'If $A \\in \\mathbb{R}^{n \\times n}$ is invertible, its inverse $A^{-1}$ is unique and satisfies: \\begin{enumerate} \\item $(A^{-1})^{-1} = A$ \\item $(AB)^{-1} = B^{-1}A^{-1}$ for invertible $B$ \\item $(A^T)^{-1} = (A^{-1})^T$ \\end{enumerate}',
        },
      ],
      whyItMatters: {
        context: 'Knowing inverse properties lets us manipulate matrix equations like scalar equations.',
        applications: [
          'Solving $AX = B$: $X = A^{-1}B$ (but computing $A^{-1}$ explicitly is expensive — use LU instead)',
          '$(AB)^{-1} = B^{-1}A^{-1}$ is the "reverse-order law," critical in signal processing and control',
          'The formula $(A^T A)^{-1} A^T$ (Moore-Penrose pseudoinverse) appears in least squares',
        ],
      },
      resources: [
        {
          title: 'Inverse of a matrix',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=iUQR0enP7RQ',
          durationMinutes: 11,
          description: 'Computing and using matrix inverses.',
        },
      ],
      quiz: [
        {
          id: '4-11-q1',
          type: 'multiple-choice',
          question: 'If $A$ and $B$ are invertible, $(AB)^{-1}$ equals:',
          options: ['$A^{-1}B^{-1}$', '$B^{-1}A^{-1}$', '$(BA)^{-1}$', '$A^{-1} + B^{-1}$'],
          correctAnswer: 1,
          explanation: '$(AB)^{-1} = B^{-1}A^{-1}$. Verify: $(AB)(B^{-1}A^{-1}) = A(BB^{-1})A^{-1} = AIA^{-1} = AA^{-1} = I$.',
        },
      ],
      commonMistakes: [
        'Writing $(AB)^{-1} = A^{-1}B^{-1}$ — the correct order reverses: $B^{-1}A^{-1}$.',
        'Computing $A^{-1}$ explicitly when solving $A\\mathbf{x} = \\mathbf{b}$ — it\'s better to use LU decomposition.',
      ],
    },
    {
      id: '4-12',
      chapterId: '4',
      sectionNumber: '4.12',
      title: 'Permutation and Triangular Matrices',
      estimatedMinutes: 10,
      plainEnglish: [
        'Two special types of matrices arise in Gaussian elimination: **permutation matrices** and **triangular matrices**.',
        'A **permutation matrix** has exactly one 1 in each row and column (all other entries 0). Multiplying by a permutation matrix on the left permutes the rows. Permutation matrices are always invertible, with $P^{-1} = P^T$.',
        'An **upper triangular matrix** has all zeros below the diagonal; a **lower triangular matrix** has all zeros above. Triangular systems can be solved in $O(n^2)$ by forward or back substitution. The product of two triangular matrices (same type) is triangular.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 4.12',
          title: 'Triangular Matrices',
          content: '$U \\in \\mathbb{R}^{n \\times n}$ is **upper triangular** if $u_{ij} = 0$ for $i > j$. $L$ is **lower triangular** if $l_{ij} = 0$ for $i < j$. A triangular matrix is invertible iff all diagonal entries are nonzero, and its inverse is also triangular of the same type.',
        },
      ],
      whyItMatters: {
        context: 'Triangular matrices are computationally cheap to work with and arise naturally in LU decomposition.',
        applications: [
          'Solving triangular systems costs $O(n^2)$ — much cheaper than $O(n^3)$ for general systems',
          'The Cholesky factorization ($A = LL^T$) for positive definite matrices is a triangular decomposition',
          'LU decomposition (next section) expresses every matrix as a product of triangular matrices',
        ],
      },
      resources: [
        {
          title: 'Triangular matrices and permutations',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=lGGDIGizcQ0',
          durationMinutes: 49,
          description: 'Permutation matrices and triangular systems.',
        },
      ],
      quiz: [
        {
          id: '4-12-q1',
          type: 'true-false',
          question: 'An upper triangular matrix with all nonzero diagonal entries is invertible.',
          correctAnswer: true,
          explanation: 'A triangular matrix is invertible iff all diagonal entries are nonzero. Its rank equals the number of nonzero diagonal entries, which here is $n$.',
        },
      ],
      commonMistakes: [
        'Thinking a triangular matrix is always invertible — a zero diagonal entry makes it singular.',
        'Confusing upper and lower triangular when setting up LU factorization.',
      ],
    },
    {
      id: '4-13',
      chapterId: '4',
      sectionNumber: '4.13',
      title: 'LU Decomposition and Efficient Solving',
      estimatedMinutes: 14,
      plainEnglish: [
        '**LU decomposition** factors a matrix as $PA = LU$, where $P$ is a permutation matrix (from row swaps), $L$ is unit lower triangular (the elimination multipliers on and below the diagonal), and $U$ is upper triangular (the echelon form).',
        'Why is this useful? To solve $A\\mathbf{x} = \\mathbf{b}$: compute $\\ mathbf{c} = P\\mathbf{b}$ (apply row permutations, $O(n)$), then solve $L\\mathbf{y} = \\mathbf{c}$ by forward substitution ($O(n^2)$), then solve $U\\mathbf{x} = \\mathbf{y}$ by back substitution ($O(n^2)$). Total: $O(n^2)$ per right-hand side after $O(n^3)$ one-time factorization.',
        'This pays off when solving $A\\mathbf{x} = \\mathbf{b}_1, A\\mathbf{x} = \\mathbf{b}_2, \\ldots$ for many different $\\mathbf{b}$: factorize once ($O(n^3)$), then solve each system in $O(n^2)$. MATLAB\'s $x = A \\backslash b$ uses LU under the hood.',
      ],
      formalView: [
        {
          type: 'theorem',
          label: 'Theorem 4.13 (LU Decomposition)',
          content: 'Every invertible matrix $A \\in \\mathbb{R}^{n \\times n}$ has a factorization $PA = LU$ where $P$ is a permutation matrix, $L$ is unit lower triangular (diagonal entries all 1), and $U$ is upper triangular with nonzero diagonal. To solve $A\\mathbf{x} = \\mathbf{b}$: \\begin{enumerate} \\item Set $\\mathbf{c} = P\\mathbf{b}$ \\item Solve $L\\mathbf{y} = \\mathbf{c}$ (forward substitution) \\item Solve $U\\mathbf{x} = \\mathbf{y}$ (back substitution) \\end{enumerate}',
        },
        {
          type: 'remark',
          label: 'Remark 4.13',
          title: 'Complexity',
          content: 'LU decomposition: $O(n^3)$ (done once). Forward/back substitution: $O(n^2)$ per right-hand side. If $k$ systems $A\\mathbf{x} = \\mathbf{b}_i$ are solved, total cost is $O(n^3 + kn^2)$ versus $O(kn^3)$ without LU.',
        },
      ],
      diagram: {
        type: 'LUDecompositionAnimator',
        props: {
          matrix: [[2, 1, 1], [4, 3, 3], [8, 7, 9]],
        },
      },
      whyItMatters: {
        context: 'LU decomposition is the backbone of practical linear system solving in science and engineering.',
        applications: [
          'MATLAB\'s backslash operator, NumPy\'s `linalg.solve`, and LAPACK all use LU decomposition',
          'Finite element analysis solves the same stiffness matrix $A$ for many load vectors $\\mathbf{b}$',
          'Real-time simulation in games uses pre-factored LU to solve physics constraints efficiently',
        ],
      },
      resources: [
        {
          title: 'LU decomposition',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=MsIvs_6vC38',
          durationMinutes: 49,
          description: 'Gilbert Strang\'s lecture on LU decomposition and its efficiency.',
        },
        {
          title: 'LU factorization explained',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=UlWcofkUDDU',
          durationMinutes: 15,
          description: 'Step-by-step LU factorization with examples.',
        },
      ],
      quiz: [
        {
          id: '4-13-q1',
          type: 'multiple-choice',
          question: 'If $PA = LU$, solving $A\\mathbf{x} = \\mathbf{b}$ requires:',
          options: [
            'One matrix inversion',
            'Two triangular system solves and a permutation',
            'One matrix-matrix multiplication',
            'Finding all eigenvalues of $A$',
          ],
          correctAnswer: 1,
          explanation: 'Compute $\\mathbf{c} = P\\mathbf{b}$ (permutation), solve $L\\mathbf{y} = \\mathbf{c}$ (forward sub), solve $U\\mathbf{x} = \\mathbf{y}$ (back sub). Two triangular solves plus a permutation.',
        },
        {
          id: '4-13-q2',
          type: 'true-false',
          question: 'LU decomposition is most efficient when the same matrix $A$ is used to solve systems with many different right-hand sides.',
          correctAnswer: true,
          explanation: 'Factorize $A$ once ($O(n^3)$), then solve each new $\\mathbf{b}$ in $O(n^2)$. For $k$ systems, total is $O(n^3 + kn^2)$ versus $O(kn^3)$ without LU.',
        },
      ],
      commonMistakes: [
        'Computing $A^{-1}$ explicitly to solve $A\\mathbf{x} = \\mathbf{b}$ — LU decomposition is far more efficient and numerically stable.',
        'Forgetting the permutation matrix $P$ — it records the row swaps needed for numerical stability.',
        'Applying LU to singular matrices — LU decomposition requires invertibility for the square case.',
      ],
    },
  ],
};

export default chapter4;
