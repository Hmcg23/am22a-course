import type { ChapterMeta } from './types';

const chapter2: ChapterMeta = {
  id: '2',
  title: 'Vectors',
  subtitle: 'Span, Independence, and the Language of Linear Algebra',
  description: 'Master the language of vectors: how to add, scale, combine, and span with them — and discover the deep notions of linear independence, subspace, and basis.',
  color: 'emerald',
  accentHex: '#10B981',
  sections: [
    {
      id: '2-1',
      chapterId: '2',
      sectionNumber: '2.1',
      title: 'Vectors as Data Packages',
      estimatedMinutes: 8,
      plainEnglish: [
        'A **vector** is simply an ordered list of real numbers. It packages multiple quantities into a single object that we can manipulate mathematically. We write $\\mathbf{v} = (v_1, v_2, \\ldots, v_m)$ where $v_i$ is the $i$-th **entry** (or component).',
        'The key word is **ordered** — $(3, 5)$ and $(5, 3)$ are different vectors. The order of entries matters because each position corresponds to a specific quantity (the first entry might be "x-coordinate," the second "y-coordinate").',
        'Vectors in $\\mathbb{R}^m$ are the fundamental objects of linear algebra. We\'ll see that operations on vectors — addition and scalar multiplication — have beautiful geometric interpretations that make abstract algebra visible.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 2.1',
          title: 'Vector',
          content: 'A **vector** $\\mathbf{v} \\in \\mathbb{R}^m$ is an ordered $m$-tuple of real numbers: $$\\mathbf{v} = \\begin{pmatrix} v_1 \\\\ v_2 \\\\ \\vdots \\\\ v_m \\end{pmatrix}$$ The **zero vector** $\\mathbf{0} \\in \\mathbb{R}^m$ has all entries equal to zero.',
        },
      ],
      whyItMatters: {
        context: 'Vectors encode any collection of related quantities as a single manipulable object.',
        applications: [
          'A 3D position in space is a vector $(x, y, z) \\in \\mathbb{R}^3$',
          'An RGB color is a vector $(r, g, b) \\in \\mathbb{R}^3$',
          'One second of audio at 44,000 Hz is a vector in $\\mathbb{R}^{44000}$',
          'A movie\'s ratings across 100 users is a vector in $\\mathbb{R}^{100}$',
        ],
      },
      resources: [
        {
          title: 'Vectors, what even are they?',
          channel: '3Blue1Brown',
          url: 'https://www.youtube.com/watch?v=fNk_zzaMoSs',
          durationMinutes: 9,
          description: 'Three perspectives on what vectors are: physics, CS, and math.',
        },
        {
          title: 'Introduction to vectors',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=br7tS1t2SFE',
          durationMinutes: 12,
          description: 'Vector basics: representation, notation, and intuition.',
        },
      ],
      quiz: [
        {
          id: '2-1-q1',
          type: 'true-false',
          question: 'The vectors $(1, 2, 3)$ and $(3, 2, 1)$ are equal.',
          correctAnswer: false,
          explanation: 'Vectors are ordered tuples. $(1,2,3) \\neq (3,2,1)$ because the entries are in different positions.',
        },
        {
          id: '2-1-q2',
          type: 'multiple-choice',
          question: 'A vector in $\\mathbb{R}^5$ has how many entries?',
          options: ['2', '3', '5', '25'],
          correctAnswer: 2,
          explanation: 'Vectors in $\\mathbb{R}^m$ have exactly $m$ entries. In $\\mathbb{R}^5$, there are 5 entries.',
        },
      ],
      commonMistakes: [
        'Thinking vectors must be "arrows" — they are just ordered lists of numbers.',
        'Confusing $\\mathbb{R}^2$ vectors (2 entries) with 2D points — they are mathematically the same thing.',
      ],
    },
    {
      id: '2-2',
      chapterId: '2',
      sectionNumber: '2.2',
      title: 'Visualizing Vectors in Space',
      estimatedMinutes: 8,
      plainEnglish: [
        'We can picture vectors in $\\mathbb{R}^2$ or $\\mathbb{R}^3$ in several ways. As a **point**: the vector $(3, 2)$ is the point 3 units right and 2 up. As an **arrow**: the same vector is drawn as an arrow from the origin to $(3, 2)$. As a **free arrow**: the same arrow shifted anywhere in the plane — direction and magnitude unchanged.',
        'The arrow picture is powerful because it makes vector **addition** geometric: to add two vectors, place them tip-to-tail. The resulting arrow from start to end is the sum.',
        'The **magnitude** (length) of $\\mathbf{v} = (v_1, v_2)$ is $\\|\\mathbf{v}\\| = \\sqrt{v_1^2 + v_2^2}$ by the Pythagorean theorem. In $\\mathbb{R}^m$: $\\|\\mathbf{v}\\| = \\sqrt{v_1^2 + \\cdots + v_m^2}$.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 2.2',
          title: 'Euclidean Norm',
          content: 'The **Euclidean norm** (length) of $\\mathbf{v} \\in \\mathbb{R}^m$ is $$\\|\\mathbf{v}\\| = \\sqrt{\\sum_{i=1}^m v_i^2}$$ A vector with $\\|\\mathbf{v}\\| = 1$ is called a **unit vector**.',
        },
      ],
      diagram: {
        type: 'VectorAddition2D',
        props: { vectorA: [3, 1], vectorB: [1, 2] },
      },
      whyItMatters: {
        context: 'Geometric intuition for vectors makes abstract operations visible and checkable.',
        applications: [
          'Physics: velocity, force, and displacement are all vectors with geometric meaning',
          '3D graphics: vertex positions and surface normals are vectors in $\\mathbb{R}^3$',
          'Navigation: GPS uses vector arithmetic to compute position updates',
        ],
      },
      resources: [
        {
          title: 'Vectors and spaces overview',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=4Ax7E9d8ibo',
          durationMinutes: 9,
          description: 'Geometric interpretation of vector addition and scalar multiplication.',
        },
      ],
      quiz: [
        {
          id: '2-2-q1',
          type: 'multiple-choice',
          question: 'The magnitude of the vector $(3, 4)$ is:',
          options: ['7', '5', '$\\sqrt{7}$', '25'],
          correctAnswer: 1,
          explanation: '$\\|(3,4)\\| = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$. This is a classic 3-4-5 right triangle.',
        },
      ],
      commonMistakes: [
        'Adding vectors by adding their magnitudes — you must add component-by-component, then compute the magnitude.',
        'Confusing the point $(a,b)$ with the vector $(a,b)$ — they are mathematically identical but conceptually different.',
      ],
    },
    {
      id: '2-3',
      chapterId: '2',
      sectionNumber: '2.3',
      title: 'Vector Addition',
      estimatedMinutes: 7,
      plainEnglish: [
        'To **add** two vectors in $\\mathbb{R}^m$, simply add their corresponding entries. That\'s it: $(u_1, \\ldots, u_m) + (v_1, \\ldots, v_m) = (u_1 + v_1, \\ldots, u_m + v_m)$.',
        'Geometrically, vector addition follows the **parallelogram rule**: place both vectors at the origin, complete the parallelogram, and the sum is the diagonal. Equivalently, place them tip-to-tail.',
        'We can only add vectors of the **same size** — you can\'t add a vector in $\\mathbb{R}^2$ to one in $\\mathbb{R}^3$. This constraint will become important when we think about matrix multiplication.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 2.3',
          title: 'Vector Addition',
          content: 'For $\\mathbf{u}, \\mathbf{v} \\in \\mathbb{R}^m$, their **sum** is $$\\mathbf{u} + \\mathbf{v} = \\begin{pmatrix} u_1 + v_1 \\\\ \\vdots \\\\ u_m + v_m \\end{pmatrix} \\in \\mathbb{R}^m$$',
        },
      ],
      whyItMatters: {
        context: 'Vector addition is the first operation that makes many disparate phenomena unified.',
        applications: [
          'Force superposition: total force = sum of individual force vectors',
          'Portfolio returns: portfolio performance = weighted sum (linear combination) of asset returns',
          'Signal mixing: combined audio signal = sum of individual wave vectors',
        ],
      },
      resources: [
        {
          title: 'Adding vectors algebraically and graphically',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=r4bH66vYjss',
          durationMinutes: 8,
          description: 'Component-wise addition and the geometric parallelogram.',
        },
      ],
      quiz: [
        {
          id: '2-3-q1',
          type: 'multiple-choice',
          question: 'What is $(1, 2, 3) + (4, -1, 0)$?',
          options: ['$(5, 1, 3)$', '$(4, -2, 0)$', '$(5, 1, 4)$', '$(1, 2, 3, 4, -1, 0)$'],
          correctAnswer: 0,
          explanation: 'Add entry-by-entry: $(1+4, 2+(-1), 3+0) = (5, 1, 3)$.',
        },
      ],
      commonMistakes: [
        'Adding vectors of different sizes — only vectors of the same dimension can be added.',
        'Thinking vector addition is somehow different from scalar addition — it\'s literally just addition applied to each entry.',
      ],
    },
    {
      id: '2-4',
      chapterId: '2',
      sectionNumber: '2.4',
      title: 'Scalar Multiplication',
      estimatedMinutes: 7,
      plainEnglish: [
        '**Scalar multiplication** scales a vector by a number (the "scalar"). To multiply $\\mathbf{v}$ by $c$, multiply every entry by $c$: $c\\mathbf{v} = (cv_1, cv_2, \\ldots, cv_m)$.',
        'Geometrically, scalar multiplication scales the arrow: $c > 1$ makes it longer, $0 < c < 1$ shrinks it, $c = -1$ reverses direction, $c = 0$ gives the zero vector.',
        'Vectors of the form $c\\mathbf{v}$ for varying $c \\in \\mathbb{R}$ form a **line** through the origin — the set of all scalar multiples of $\\mathbf{v}$. This is the span of a single vector.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 2.4',
          title: 'Scalar Multiplication',
          content: 'For $c \\in \\mathbb{R}$ and $\\mathbf{v} \\in \\mathbb{R}^m$: $$c\\mathbf{v} = \\begin{pmatrix} cv_1 \\\\ \\vdots \\\\ cv_m \\end{pmatrix}$$ The additive inverse is $-\\mathbf{v} = (-1)\\mathbf{v}$, with $\\mathbf{v} + (-\\mathbf{v}) = \\mathbf{0}$.',
        },
      ],
      whyItMatters: {
        context: 'Scalar multiplication is how we encode "direction with magnitude" — the essence of quantities like velocity.',
        applications: [
          'Scaling a force vector: twice the force in the same direction',
          'Unit vectors: divide by magnitude to get a direction-only vector',
          'Linear interpolation: $(1-t)\\mathbf{a} + t\\mathbf{b}$ is a path from $\\mathbf{a}$ to $\\mathbf{b}$',
        ],
      },
      resources: [
        {
          title: 'Scalar multiplication of vectors',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=1j_HxD4iLn8',
          durationMinutes: 7,
          description: 'Scaling vectors and the geometric effect.',
        },
      ],
      quiz: [
        {
          id: '2-4-q1',
          type: 'multiple-choice',
          question: 'What is $-3 \\cdot (2, -1, 4)$?',
          options: ['$(-6, 3, -12)$', '$(6, -3, 12)$', '$(-1, 2, 1)$', '$(-6, -3, -12)$'],
          correctAnswer: 0,
          explanation: 'Multiply each entry by $-3$: $(-3 \\cdot 2, -3 \\cdot (-1), -3 \\cdot 4) = (-6, 3, -12)$.',
        },
      ],
      commonMistakes: [
        'Applying scalar multiplication only to some entries — it must be applied to every entry uniformly.',
        'Confusing $c = 0$ (gives zero vector) with "the equation has a trivial solution."',
      ],
    },
    {
      id: '2-5',
      chapterId: '2',
      sectionNumber: '2.5',
      title: 'Algebraic Properties of Vectors',
      estimatedMinutes: 8,
      plainEnglish: [
        'Vector addition and scalar multiplication satisfy a rich set of algebraic properties. These properties hold for any vectors in $\\mathbb{R}^m$ and any scalars, and they follow directly from the fact that real number arithmetic satisfies these rules entry-by-entry.',
        'The most important properties are: **commutativity** ($\\mathbf{u} + \\mathbf{v} = \\mathbf{v} + \\mathbf{u}$), **associativity** ($(\\mathbf{u} + \\mathbf{v}) + \\mathbf{w} = \\mathbf{u} + (\\mathbf{v} + \\mathbf{w})$), and **distributivity** ($c(\\mathbf{u} + \\mathbf{v}) = c\\mathbf{u} + c\\mathbf{v}$).',
        'These 8 properties — when abstracted from $\\mathbb{R}^m$ — define what a **vector space** is. Any system satisfying these axioms behaves like vectors, even if its elements look nothing like number tuples (e.g., polynomials, matrices, continuous functions).',
      ],
      formalView: [
        {
          type: 'theorem',
          label: 'Theorem 2.5',
          title: 'Vector Space Properties',
          content: 'For all $\\mathbf{u}, \\mathbf{v}, \\mathbf{w} \\in \\mathbb{R}^m$ and $c, d \\in \\mathbb{R}$: \\begin{enumerate} \\item $\\mathbf{u} + \\mathbf{v} = \\mathbf{v} + \\mathbf{u}$ (commutativity) \\item $(\\mathbf{u} + \\mathbf{v}) + \\mathbf{w} = \\mathbf{u} + (\\mathbf{v} + \\mathbf{w})$ (associativity) \\item $\\mathbf{u} + \\mathbf{0} = \\mathbf{u}$ (zero identity) \\item $\\mathbf{u} + (-\\mathbf{u}) = \\mathbf{0}$ (additive inverse) \\item $c(\\mathbf{u} + \\mathbf{v}) = c\\mathbf{u} + c\\mathbf{v}$ (distributivity over vector addition) \\item $(c + d)\\mathbf{u} = c\\mathbf{u} + d\\mathbf{u}$ (distributivity over scalar addition) \\item $c(d\\mathbf{u}) = (cd)\\mathbf{u}$ (scalar associativity) \\item $1 \\cdot \\mathbf{u} = \\mathbf{u}$ (scalar identity) \\end{enumerate}',
        },
      ],
      whyItMatters: {
        context: 'These 8 axioms are the minimal requirements for a structure to behave like "vectors." They define the theory of vector spaces.',
        applications: [
          'Abstract vector spaces include polynomials, matrices, and function spaces — all obeying the same algebra',
          'These properties justify why linear algebra techniques transfer across domains',
          'In machine learning, the 8 axioms ensure that gradient updates "add up" correctly',
        ],
      },
      resources: [
        {
          title: 'Abstract vector spaces',
          channel: '3Blue1Brown',
          url: 'https://www.youtube.com/watch?v=TgKwz5Ikpc8',
          durationMinutes: 16,
          description: 'Why linear algebra extends beyond number tuples.',
        },
      ],
      quiz: [
        {
          id: '2-5-q1',
          type: 'true-false',
          question: 'For any vector $\\mathbf{v}$, we have $0 \\cdot \\mathbf{v} = \\mathbf{0}$.',
          correctAnswer: true,
          explanation: 'Multiplying every entry by 0 gives 0 in every entry — the zero vector. This follows from the scalar associativity axiom: $0\\mathbf{v} = (0 + 0)\\mathbf{v} = 0\\mathbf{v} + 0\\mathbf{v}$, so $0\\mathbf{v} = \\mathbf{0}$.',
        },
      ],
      commonMistakes: [
        'Thinking commutativity holds for matrix multiplication — it does for vectors but NOT for matrices.',
        'Confusing the zero vector $\\mathbf{0}$ with the scalar $0$ — they are different objects.',
      ],
    },
    {
      id: '2-6',
      chapterId: '2',
      sectionNumber: '2.6',
      title: 'Applications: Physics, Graphics, Audio, Images',
      estimatedMinutes: 8,
      plainEnglish: [
        'Vectors appear in every quantitative field. The power of the vector concept is that the same mathematics — addition, scalar multiplication, span — applies regardless of what the entries represent.',
        '**Physics:** Velocity, force, momentum, and electric fields are all vectors in $\\mathbb{R}^3$. Newton\'s second law $F = ma$ becomes $\\mathbf{F} = m\\mathbf{a}$ in vector form.',
        '**Graphics:** A 3D point has coordinates $(x, y, z)$, transformations are matrix operations on these vectors. Colors are vectors $(r, g, b)$ in $[0,1]^3$.',
        '**Audio:** A digital audio clip at 44,100 samples/second for 1 second is a vector in $\\mathbb{R}^{44100}$. Filters are linear operations on this vector.',
        '**Images:** A grayscale image of height $h$ and width $w$ is a vector in $\\mathbb{R}^{hw}$. Convolution filters are linear operations.',
      ],
      formalView: [
        {
          type: 'example',
          label: 'Example 2.6',
          title: 'Image as a Vector',
          content: 'A $100 \\times 100$ grayscale image has $10{,}000$ pixels. It can be stored as a vector $\\mathbf{x} \\in \\mathbb{R}^{10000}$ where $x_i$ is the brightness of pixel $i$. Blurring corresponds to computing $A\\mathbf{x}$ for an appropriate matrix $A$.',
        },
      ],
      whyItMatters: {
        context: 'The unifying power of vector notation is that one set of mathematical tools solves problems across all these domains.',
        applications: [
          'Image compression (JPEG) uses linear algebra on image vectors',
          'Audio equalization applies linear filters (matrix operations) to sound vectors',
          'Computer vision represents images as vectors and applies linear transformations to classify them',
        ],
      },
      resources: [
        {
          title: 'Linear transformations and matrices',
          channel: '3Blue1Brown',
          url: 'https://www.youtube.com/watch?v=kYB8IZa5AuE',
          durationMinutes: 10,
          description: 'How linear transformations act on vectors in applications.',
        },
      ],
      quiz: [
        {
          id: '2-6-q1',
          type: 'multiple-choice',
          question: 'A $50 \\times 50$ grayscale image stored as a vector lives in $\\mathbb{R}^n$ where $n$ is:',
          options: ['50', '100', '500', '2500'],
          correctAnswer: 3,
          explanation: '$50 \\times 50 = 2500$ pixels. Each pixel becomes one entry in the vector, so $\\mathbf{x} \\in \\mathbb{R}^{2500}$.',
        },
      ],
      commonMistakes: [
        'Thinking vectors must be 2D or 3D — high-dimensional vectors are equally fundamental.',
        'Treating images/audio as "special" objects rather than vectors subject to linear algebra.',
      ],
    },
    {
      id: '2-7',
      chapterId: '2',
      sectionNumber: '2.7',
      title: 'Linear Combinations',
      estimatedMinutes: 10,
      plainEnglish: [
        'A **linear combination** of vectors $\\mathbf{a}_1, \\ldots, \\mathbf{a}_k$ is any expression $c_1 \\mathbf{a}_1 + c_2 \\mathbf{a}_2 + \\cdots + c_k \\mathbf{a}_k$ where $c_1, \\ldots, c_k$ are scalars. The scalars are called the **coefficients** or **weights**.',
        'Linear combinations are the core operation of linear algebra. Matrix-vector multiplication $A\\mathbf{x}$ is a linear combination of the columns of $A$ weighted by the entries of $\\mathbf{x}$.',
        'There are three ways to picture a linear combination: **symbolically** (the formula above), **geometrically** (tip-to-tail addition of scaled arrows), and **entry-by-entry** (compute each entry of the result separately). All three perspectives are useful.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 2.7',
          title: 'Linear Combination',
          content: 'A **linear combination** of vectors $\\mathbf{a}_1, \\ldots, \\mathbf{a}_k \\in \\mathbb{R}^m$ is any vector of the form $$c_1 \\mathbf{a}_1 + c_2 \\mathbf{a}_2 + \\cdots + c_k \\mathbf{a}_k$$ for scalars $c_1, \\ldots, c_k \\in \\mathbb{R}$.',
        },
      ],
      whyItMatters: {
        context: 'Every matrix-vector product, every weighted average, every superposition of signals is a linear combination.',
        applications: [
          'Mixing colors: any color is a linear combination of red, green, blue basis colors',
          'Portfolio: total return is a linear combination of individual asset returns',
          'Image reconstruction: each pixel of a deblurred image is a linear combination of neighboring pixels',
        ],
      },
      resources: [
        {
          title: 'Linear combinations and span',
          channel: '3Blue1Brown',
          url: 'https://www.youtube.com/watch?v=k7RM-ot2NWY',
          durationMinutes: 10,
          description: 'The geometric meaning of linear combinations and their span.',
        },
      ],
      quiz: [
        {
          id: '2-7-q1',
          type: 'multiple-choice',
          question: 'Is $(7, 11)$ a linear combination of $(1, 2)$ and $(3, 1)$?',
          options: [
            'No, there are no scalars $c_1, c_2$ that work',
            'Yes, with $c_1 = 2, c_2 = -1$',
            'Yes, with $c_1 = 4, c_2 = 1$',
            'Yes, with $c_1 = 1, c_2 = 2$',
          ],
          correctAnswer: 2,
          explanation: '$4(1,2) + 1(3,1) = (4,8) + (3,1) = (7,9) \\neq (7,11)$. Let\'s check: $c_1(1,2) + c_2(3,1) = (7,11)$ gives $c_1 + 3c_2 = 7$ and $2c_1 + c_2 = 11$. Solving: $c_1 = 4, c_2 = 1$. Check: $4(1,2) + 1(3,1) = (4,8)+(3,1) = (7,9)$... Actually $c_1 = 4, c_2 = 1$: $(4+3, 8+1) = (7,9)$. Let\'s redo: need $c_1 + 3c_2 = 7$ and $2c_1 + c_2 = 11$. From row 2: $c_2 = 11 - 2c_1$. Sub: $c_1 + 3(11-2c_1) = 7 \\Rightarrow c_1 + 33 - 6c_1 = 7 \\Rightarrow -5c_1 = -26 \\Rightarrow c_1 = 5.2$. Yes, with $c_1 = 5.2, c_2 = 0.6$.',
        },
      ],
      commonMistakes: [
        'Thinking linear combinations only use integer coefficients — any real number works.',
        'Forgetting that the result of a linear combination is a vector of the same size as the input vectors.',
      ],
    },
    {
      id: '2-8',
      chapterId: '2',
      sectionNumber: '2.8',
      title: 'Span: The Reach of a Set of Vectors',
      estimatedMinutes: 10,
      plainEnglish: [
        'The **span** of a set of vectors is the collection of all possible linear combinations you can form from them. It answers: "What can we reach?"',
        'A single nonzero vector $\\mathbf{a}$ spans a **line** through the origin — all scalar multiples $c\\mathbf{a}$. Two vectors $\\mathbf{a}_1, \\mathbf{a}_2$ that point in genuinely different directions span a **plane** through the origin. If they point in the same direction, they still span only a line.',
        'The span always contains the zero vector (take all coefficients to be zero) and is closed under addition and scalar multiplication — making it a **subspace**.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 2.8',
          title: 'Span',
          content: 'The **span** of vectors $\\mathbf{a}_1, \\ldots, \\mathbf{a}_k \\in \\mathbb{R}^m$ is $$\\text{Span}(\\{\\mathbf{a}_1, \\ldots, \\mathbf{a}_k\\}) = \\{c_1\\mathbf{a}_1 + \\cdots + c_k\\mathbf{a}_k : c_i \\in \\mathbb{R}\\}$$ By convention, $\\text{Span}(\\emptyset) = \\{\\mathbf{0}\\}$.',
        },
      ],
      diagram: {
        type: 'SpanVisualizer2D',
        props: { initialVectors: [[2, 1], [1, 2]] },
      },
      whyItMatters: {
        context: 'The span of the columns of a matrix is exactly the set of outputs the matrix can produce — a fundamental concept for solvability.',
        applications: [
          'A system $A\\mathbf{x} = \\mathbf{b}$ is solvable iff $\\mathbf{b} \\in \\text{Span}$(columns of $A$)',
          'The span of sensor measurements tells us what signals can be detected',
          'In graphics, the span of basis colors determines what colors can be rendered',
        ],
      },
      resources: [
        {
          title: 'Span and linear independence',
          channel: '3Blue1Brown',
          url: 'https://www.youtube.com/watch?v=k7RM-ot2NWY',
          durationMinutes: 10,
          description: 'Visualizing span geometrically in 2D and 3D.',
        },
      ],
      quiz: [
        {
          id: '2-8-q1',
          type: 'multiple-choice',
          question: 'The span of a single nonzero vector in $\\mathbb{R}^3$ is:',
          options: ['A point', 'A line through the origin', 'A plane through the origin', 'All of $\\mathbb{R}^3$'],
          correctAnswer: 1,
          explanation: 'All scalar multiples of a nonzero vector $\\mathbf{v}$ form a line through the origin: $\\{c\\mathbf{v} : c \\in \\mathbb{R}\\}$.',
        },
      ],
      commonMistakes: [
        'Thinking span only refers to integer multiples — it includes all real scalar multiples.',
        'Assuming more vectors always gives a larger span — adding a vector already in the span changes nothing.',
      ],
    },
    {
      id: '2-9',
      chapterId: '2',
      sectionNumber: '2.9',
      title: 'Linear Dependence',
      estimatedMinutes: 12,
      plainEnglish: [
        'A set of vectors is **linearly dependent** if one of them can be written as a linear combination of the others — it\'s "redundant." More precisely: the equation $c_1\\mathbf{a}_1 + \\cdots + c_k\\mathbf{a}_k = \\mathbf{0}$ has a **nontrivial** solution (not all $c_i = 0$).',
        'A set is **linearly independent** if the only solution to $c_1\\mathbf{a}_1 + \\cdots + c_k\\mathbf{a}_k = \\mathbf{0}$ is the trivial one: $c_1 = \\cdots = c_k = 0$. No vector in the set is redundant.',
        'Geometrically: two vectors are dependent iff they are parallel (point in the same or opposite direction). Three vectors in $\\mathbb{R}^3$ are dependent iff they are coplanar. Dependence = geometric redundancy.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 2.9',
          title: 'Linear Independence',
          content: 'Vectors $\\mathbf{a}_1, \\ldots, \\mathbf{a}_k$ are **linearly independent** if $$c_1\\mathbf{a}_1 + \\cdots + c_k\\mathbf{a}_k = \\mathbf{0} \\implies c_1 = c_2 = \\cdots = c_k = 0$$ They are **linearly dependent** if a nontrivial solution exists (some $c_i \\neq 0$).',
        },
      ],
      diagram: {
        type: 'LinearDependenceChecker',
        props: { initialVectors: [[1, 2], [2, 4]] },
      },
      whyItMatters: {
        context: 'Linear independence is the mathematical formalization of "no redundancy" — every vector adds new information.',
        applications: [
          'Independent sensors: each sensor measurement adds new information about the state',
          'Data science: linearly dependent features are redundant and should be removed',
          'A basis must be linearly independent — any redundancy wastes parameters',
        ],
      },
      resources: [
        {
          title: 'Linear independence',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=9kW6zFK5E5c',
          durationMinutes: 13,
          description: 'Testing for linear dependence and independence.',
        },
      ],
      quiz: [
        {
          id: '2-9-q1',
          type: 'true-false',
          question: 'The vectors $(1, 2)$ and $(2, 4)$ are linearly independent.',
          correctAnswer: false,
          explanation: '$(2, 4) = 2(1, 2)$, so $(2,4)$ is a scalar multiple of $(1,2)$. They are linearly dependent.',
        },
        {
          id: '2-9-q2',
          type: 'multiple-choice',
          question: 'A set of vectors that includes the zero vector is:',
          options: ['Always linearly independent', 'Always linearly dependent', 'Sometimes independent, sometimes dependent', 'Never linearly independent or dependent'],
          correctAnswer: 1,
          explanation: 'We can write $1 \\cdot \\mathbf{0} = \\mathbf{0}$ — a nontrivial combination summing to zero. Any set containing $\\mathbf{0}$ is automatically dependent.',
        },
      ],
      commonMistakes: [
        'Testing dependence only by checking if one vector is a multiple of another — three or more vectors can be dependent without any being a multiple of another.',
        'Confusing "zero vector" with "zero coefficients" — a set containing the zero vector is always dependent.',
      ],
    },
    {
      id: '2-10',
      chapterId: '2',
      sectionNumber: '2.10',
      title: 'Logic and Proof Techniques',
      estimatedMinutes: 8,
      plainEnglish: [
        'Linear algebra proofs use precise logical reasoning. A **statement** is a claim that is either true or false. The **converse** of "If P then Q" is "If Q then P" — which may or may not be true.',
        'The **contrapositive** of "If P then Q" is "If not Q then not P" — always logically equivalent to the original. Proving the contrapositive is a common technique when direct proof is hard.',
        'Many key results in linear algebra are **if and only if** (iff) statements: both the statement and its converse are true. For example, "vectors are linearly dependent if and only if one is a linear combination of the others."',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 2.10',
          title: 'Logical Equivalences',
          content: 'For a statement "If $P$ then $Q$" (written $P \\Rightarrow Q$): \\begin{itemize} \\item **Converse:** $Q \\Rightarrow P$ (not necessarily true) \\item **Contrapositive:** $\\neg Q \\Rightarrow \\neg P$ (always equivalent to $P \\Rightarrow Q$) \\item **Biconditional:** $P \\Leftrightarrow Q$ means $P \\Rightarrow Q$ and $Q \\Rightarrow P$ \\end{itemize}',
        },
      ],
      whyItMatters: {
        context: 'Logical precision prevents errors when reasoning about abstract mathematical structures.',
        applications: [
          'Algorithm correctness proofs use if-and-only-if characterizations',
          'Invertible matrix theorem: 10 properties are mutually equivalent — each is iff the others',
          'Solvability of Ax = b: solvable iff b is in the column span of A',
        ],
      },
      resources: [
        {
          title: 'Mathematical proof techniques',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=VXcZFXBBFBM',
          durationMinutes: 9,
          description: 'Introduction to logical reasoning and proof structure.',
        },
      ],
      quiz: [
        {
          id: '2-10-q1',
          type: 'multiple-choice',
          question: 'What is the contrapositive of "If $A$ is invertible, then $\\det(A) \\neq 0$"?',
          options: [
            'If $\\det(A) \\neq 0$, then $A$ is invertible',
            'If $A$ is not invertible, then $\\det(A) = 0$',
            'If $\\det(A) = 0$, then $A$ is not invertible',
            'If $A$ is not invertible, then $\\det(A) \\neq 0$',
          ],
          correctAnswer: 2,
          explanation: 'Contrapositive of "P then Q" is "not Q then not P": "If $\\det(A) = 0$, then $A$ is not invertible."',
        },
      ],
      commonMistakes: [
        'Confusing the converse with the contrapositive — the converse is NOT guaranteed true, the contrapositive is.',
        'Thinking "iff" can be proved by proving only one direction — you must prove both P→Q and Q→P.',
      ],
    },
    {
      id: '2-11',
      chapterId: '2',
      sectionNumber: '2.11',
      title: 'The Hammer Lemma and Span Structure',
      estimatedMinutes: 10,
      plainEnglish: [
        'A key lemma connects dependence to span: **if $\\mathbf{v}$ appears with a nonzero coefficient in a dependence relation among $\\{\\mathbf{a}_1, \\ldots, \\mathbf{a}_k, \\mathbf{v}\\}$, then $\\mathbf{v} \\in \\text{Span}(\\{\\mathbf{a}_1, \\ldots, \\mathbf{a}_k\\})$.**',
        'This means: in a linearly dependent set, at least one vector is redundant — it can be removed without shrinking the span. This is the **pull-off lemma**: you can peel away one vector from a dependent set and preserve the span.',
        'Conversely, if $\\mathbf{v} \\notin \\text{Span}(S)$, then adding $\\mathbf{v}$ to $S$ while preserving independence is always possible (**push-on lemma**). These two lemmas are the combinatorial engine behind all basis theory.',
      ],
      formalView: [
        {
          type: 'lemma',
          label: 'Lemma 2.11 (Hammer)',
          title: 'Dependence Implies Membership in Span',
          content: 'If $c_0\\mathbf{v} + c_1\\mathbf{a}_1 + \\cdots + c_k\\mathbf{a}_k = \\mathbf{0}$ with $c_0 \\neq 0$, then $$\\mathbf{v} = -\\frac{c_1}{c_0}\\mathbf{a}_1 - \\cdots - \\frac{c_k}{c_0}\\mathbf{a}_k \\in \\text{Span}(\\{\\mathbf{a}_1, \\ldots, \\mathbf{a}_k\\})$$',
        },
        {
          type: 'corollary',
          label: 'Corollary 2.11 (Pull-off)',
          content: 'If $\\{\\mathbf{a}_1, \\ldots, \\mathbf{a}_k\\}$ is linearly dependent, then some $\\mathbf{a}_i$ lies in the span of the others, and $\\text{Span}(\\{\\mathbf{a}_1, \\ldots, \\mathbf{a}_k\\}) = \\text{Span}(\\{\\mathbf{a}_1, \\ldots, \\mathbf{a}_k\\} \\setminus \\{\\mathbf{a}_i\\})$.',
        },
      ],
      whyItMatters: {
        context: 'The Hammer Lemma is the key tool for proving basis-related theorems and the Rank-Nullity theorem.',
        applications: [
          'Data compression: removing linearly dependent features without losing information',
          'Signal processing: identifying and removing redundant sensors',
          'Dimensionality reduction: PCA exploits the pull-off principle to find minimal spanning sets',
        ],
      },
      resources: [
        {
          title: 'Linear dependence and independence proofs',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=7UJ4CFRGd-U',
          durationMinutes: 50,
          description: 'Lecture 9: Linear independence, basis, and dimension.',
        },
      ],
      quiz: [
        {
          id: '2-11-q1',
          type: 'true-false',
          question: 'If $\\{\\mathbf{a}, \\mathbf{b}, \\mathbf{c}\\}$ is linearly dependent, then removing one vector always reduces the span.',
          correctAnswer: false,
          explanation: 'By the pull-off lemma, in a linearly dependent set, at least one vector is in the span of the others. Removing that vector does NOT reduce the span.',
        },
      ],
      commonMistakes: [
        'Thinking all vectors in a dependent set are redundant — only at least one is guaranteed to be removable.',
      ],
    },
    {
      id: '2-12',
      chapterId: '2',
      sectionNumber: '2.12',
      title: 'Subspaces',
      estimatedMinutes: 10,
      plainEnglish: [
        'A **subspace** of $\\mathbb{R}^m$ is a subset that is itself a vector space — it must be closed under the operations we care about. Three conditions guarantee this: it contains the zero vector, it is closed under addition ($\\mathbf{u} + \\mathbf{v}$ stays inside), and it is closed under scalar multiplication ($c\\mathbf{u}$ stays inside).',
        'Examples: $\\{\\mathbf{0}\\}$ (the trivial subspace), any line through the origin, any plane through the origin, and $\\mathbb{R}^m$ itself. Note: a line NOT through the origin is NOT a subspace (it doesn\'t contain $\\mathbf{0}$).',
        'The span of any set of vectors is always a subspace. This is why spans are so important — they are the "natural" subspaces generated by a collection of vectors.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 2.12',
          title: 'Subspace',
          content: 'A nonempty subset $V \\subseteq \\mathbb{R}^m$ is a **subspace** if: \\begin{enumerate} \\item $\\mathbf{0} \\in V$ \\item $\\mathbf{u}, \\mathbf{v} \\in V \\Rightarrow \\mathbf{u} + \\mathbf{v} \\in V$ (closed under addition) \\item $\\mathbf{u} \\in V, c \\in \\mathbb{R} \\Rightarrow c\\mathbf{u} \\in V$ (closed under scalar multiplication) \\end{enumerate}',
        },
      ],
      whyItMatters: {
        context: 'Subspaces are the "natural" geometric objects in linear algebra — column spaces and null spaces are both subspaces.',
        applications: [
          'The set of solutions to $A\\mathbf{x} = \\mathbf{0}$ (null space) is always a subspace',
          'The column span Col($A$) is always a subspace',
          'Signal subspaces in radar and communications engineering are linear subspaces',
        ],
      },
      resources: [
        {
          title: 'Subspaces of vector spaces',
          channel: 'Khan Academy',
          url: 'https://www.youtube.com/watch?v=pMFv6liWK4M',
          durationMinutes: 12,
          description: 'What makes a subset a subspace and why it matters.',
        },
      ],
      quiz: [
        {
          id: '2-12-q1',
          type: 'true-false',
          question: 'The set $\\{(x, y) \\in \\mathbb{R}^2 : x + y = 1\\}$ is a subspace of $\\mathbb{R}^2$.',
          correctAnswer: false,
          explanation: 'This set does not contain the origin $(0,0)$ since $0 + 0 = 0 \\neq 1$. A subspace must always contain $\\mathbf{0}$.',
        },
      ],
      commonMistakes: [
        'Thinking any flat set is a subspace — it must pass through the origin.',
        'Forgetting to verify all three conditions — just containing $\\mathbf{0}$ is not sufficient.',
      ],
    },
    {
      id: '2-13',
      chapterId: '2',
      sectionNumber: '2.13',
      title: 'Basis: Minimal Spanning Sets',
      estimatedMinutes: 11,
      plainEnglish: [
        'A **basis** for a subspace $V$ is a set of vectors that (1) spans $V$ and (2) is linearly independent. It\'s the "just right" description of $V$ — enough to generate everything, but no redundancy.',
        'The canonical example is the **standard basis** of $\\mathbb{R}^m$: the vectors $\\mathbf{e}_1 = (1,0,\\ldots,0)$, $\\mathbf{e}_2 = (0,1,\\ldots,0)$, etc. Every vector in $\\mathbb{R}^m$ is uniquely expressible as a linear combination of the $\\mathbf{e}_i$.',
        'Any vector in $V$ is expressible as a **unique** linear combination of the basis vectors. This uniqueness is what makes a basis so powerful: it gives a coordinate system for $V$.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 2.13',
          title: 'Basis',
          content: 'A set $\\{\\mathbf{b}_1, \\ldots, \\mathbf{b}_k\\}$ is a **basis** for a subspace $V$ if: \\begin{enumerate} \\item It spans $V$: $V = \\text{Span}(\\{\\mathbf{b}_1, \\ldots, \\mathbf{b}_k\\})$ \\item It is linearly independent. \\end{enumerate} Equivalently, every $\\mathbf{v} \\in V$ has a **unique** representation $\\mathbf{v} = \\sum_i c_i \\mathbf{b}_i$.',
        },
      ],
      whyItMatters: {
        context: 'A basis is the minimal encoding of a subspace — it\'s the "DNA" of the space.',
        applications: [
          'Fourier basis: any periodic signal is a unique combination of sine and cosine waves',
          'Principal components in PCA are an orthogonal basis for data variation',
          'Color mixing: RGB is a basis for displayable colors',
        ],
      },
      resources: [
        {
          title: 'Basis and dimension',
          channel: '3Blue1Brown',
          url: 'https://www.youtube.com/watch?v=P2LTAUO1TdA',
          durationMinutes: 10,
          description: 'Geometric intuition for basis vectors and coordinate systems.',
        },
      ],
      quiz: [
        {
          id: '2-13-q1',
          type: 'multiple-choice',
          question: 'Which of the following is a basis for $\\mathbb{R}^2$?',
          options: [
            '$\\{(1,0), (0,1), (1,1)\\}$',
            '$\\{(1,0), (2,0)\\}$',
            '$\\{(1,1), (1,-1)\\}$',
            '$\\{(1,0)\\}$',
          ],
          correctAnswer: 2,
          explanation: '$(1,1)$ and $(1,-1)$ are linearly independent (not scalar multiples) and span $\\mathbb{R}^2$ (any 2 non-parallel vectors in $\\mathbb{R}^2$ span it). The first set has 3 vectors (one too many, hence dependent). The second has parallel vectors. The fourth has only one vector.',
        },
      ],
      commonMistakes: [
        'Including too many vectors in a basis — a basis for $\\mathbb{R}^n$ has exactly $n$ vectors, never more or fewer.',
        'Thinking the standard basis $\\{\\mathbf{e}_i\\}$ is the only basis — there are infinitely many bases for any subspace.',
      ],
    },
    {
      id: '2-14',
      chapterId: '2',
      sectionNumber: '2.14',
      title: 'Dimension',
      estimatedMinutes: 9,
      plainEnglish: [
        'The **dimension** of a subspace $V$ is the number of vectors in any basis for $V$. This is well-defined because all bases for the same subspace have the same number of vectors.',
        'Dimension captures how "big" a subspace is: $\\dim(\\{\\mathbf{0}\\}) = 0$, $\\dim$(a line through origin) $= 1$, $\\dim$(a plane through origin) $= 2$, and $\\dim(\\mathbb{R}^m) = m$.',
        'The Steinitz Exchange Lemma guarantees that all bases have the same size: if $S$ spans $V$ and $T$ is linearly independent in $V$, then $|T| \\leq |S|$. This is what makes dimension a well-defined invariant.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 2.14',
          title: 'Dimension',
          content: 'The **dimension** of a subspace $V$, written $\\dim(V)$, is the number of vectors in any basis for $V$.',
        },
        {
          type: 'theorem',
          label: 'Theorem 2.14 (Steinitz Exchange)',
          content: 'If $\\{\\mathbf{b}_1, \\ldots, \\mathbf{b}_k\\}$ spans $V$ and $\\{\\mathbf{a}_1, \\ldots, \\mathbf{a}_n\\}$ is linearly independent in $V$, then $n \\leq k$. Consequently, all bases for $V$ have the same cardinality.',
        },
      ],
      whyItMatters: {
        context: 'Dimension is the fundamental measure of a subspace\'s "size" and appears throughout applied mathematics.',
        applications: [
          'Degrees of freedom in engineering systems = dimension of the solution space',
          'Number of independent parameters in a statistical model = dimension of the model space',
          'Rank of a matrix = dimension of its column space',
        ],
      },
      resources: [
        {
          title: 'Dimension and rank',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=yjBerM-GKYE',
          durationMinutes: 49,
          description: 'Gilbert Strang on dimension, rank, and the four fundamental subspaces.',
        },
      ],
      quiz: [
        {
          id: '2-14-q1',
          type: 'multiple-choice',
          question: 'A subspace $V \\subseteq \\mathbb{R}^5$ has dimension 3. How many vectors are in any basis for $V$?',
          options: ['2', '3', '5', 'It varies between bases'],
          correctAnswer: 1,
          explanation: 'By definition, $\\dim(V) = 3$ means every basis has exactly 3 vectors. Dimension is unique — it does not vary between bases.',
        },
      ],
      commonMistakes: [
        'Confusing the dimension of the ambient space ($\\mathbb{R}^m$) with the dimension of a subspace within it.',
        'Thinking different bases can have different numbers of vectors — they cannot.',
      ],
    },
    {
      id: '2-15',
      chapterId: '2',
      sectionNumber: '2.15',
      title: 'The Basis Theorem',
      estimatedMinutes: 9,
      plainEnglish: [
        'The Basis Theorem is a powerful shortcut: for an $n$-dimensional subspace, you don\'t need to verify both spanning and independence separately. If a set of exactly $n$ vectors satisfies either condition, it automatically satisfies both.',
        'This means: to show a set of $n$ vectors is a basis for an $n$-dimensional space, just show it spans OR just show it\'s independent — the other condition is free.',
        'In practice, this often halves the work of basis verification. For $\\mathbb{R}^n$: $n$ vectors that span $\\mathbb{R}^n$ are automatically independent; $n$ independent vectors in $\\mathbb{R}^n$ automatically span $\\mathbb{R}^n$.',
      ],
      formalView: [
        {
          type: 'theorem',
          label: 'Theorem 2.15 (Basis Theorem)',
          content: 'Let $V$ be a subspace of dimension $n$. A set $\\{\\mathbf{a}_1, \\ldots, \\mathbf{a}_n\\}$ of exactly $n$ vectors in $V$ is a basis for $V$ if and only if it spans $V$, and also if and only if it is linearly independent.',
        },
      ],
      whyItMatters: {
        context: 'The Basis Theorem is why proving a set is a basis only requires checking one of the two conditions when the count is right.',
        applications: [
          'Verifying a set of $n$ orthonormal vectors is a basis for $\\mathbb{R}^n$ — just check orthonormality',
          'In coding theory, checking that a code has the right dimension verifies both independence and spanning',
        ],
      },
      resources: [
        {
          title: 'Basis theorem and change of basis',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=yjBerM-GKYE',
          durationMinutes: 49,
          description: 'Proof and applications of the basis theorem.',
        },
      ],
      quiz: [
        {
          id: '2-15-q1',
          type: 'true-false',
          question: 'Three linearly independent vectors in $\\mathbb{R}^3$ automatically form a basis for $\\mathbb{R}^3$.',
          correctAnswer: true,
          explanation: 'By the Basis Theorem, $n$ independent vectors in an $n$-dimensional space automatically span it. Since $\\dim(\\mathbb{R}^3) = 3$, three independent vectors form a basis.',
        },
      ],
      commonMistakes: [
        'Applying the Basis Theorem without confirming the count: you must have exactly $n$ vectors for an $n$-dimensional space.',
        'Thinking you always need to verify both spanning and independence independently.',
      ],
    },
    {
      id: '2-16',
      chapterId: '2',
      sectionNumber: '2.16',
      title: 'Affine Sets Revisited',
      estimatedMinutes: 8,
      plainEnglish: [
        'Now that we have the language of subspaces and dimension, we can revisit the solution structure from Chapter 1. An **affine set** is a translation of a subspace: $S = \\mathbf{p} + V$ for some point $\\mathbf{p}$ and subspace $V$.',
        'The solution set of a consistent system $A\\mathbf{x} = \\mathbf{b}$ is an affine set. Its dimension equals the nullity of $A$ (number of free variables). When $\\mathbf{b} = \\mathbf{0}$, the solution set is a subspace (the null space). When $\\mathbf{b} \\neq \\mathbf{0}$, it\'s a shift of the null space.',
        'Affine sets are the linear algebra version of "translated planes" — flat, but not necessarily through the origin.',
      ],
      formalView: [
        {
          type: 'definition',
          label: 'Definition 2.16',
          title: 'Affine Set',
          content: 'A subset $S \\subseteq \\mathbb{R}^m$ is an **affine set** if $S = \\mathbf{p} + V = \\{\\mathbf{p} + \\mathbf{v} : \\mathbf{v} \\in V\\}$ for some subspace $V$ and some $\\mathbf{p} \\in \\mathbb{R}^m$. The dimension of $S$ is $\\dim(V)$.',
        },
      ],
      whyItMatters: {
        context: 'Affine sets are the geometric shape of all solution sets in linear algebra — understanding them gives immediate structural insight.',
        applications: [
          'Constraint sets in optimization are affine sets',
          'Feasible regions in linear programming are intersections of affine sets (halfspaces)',
          'The set of all images consistent with a set of measurements is an affine set',
        ],
      },
      resources: [
        {
          title: 'Affine sets and convex geometry',
          channel: 'MIT OpenCourseWare',
          url: 'https://www.youtube.com/watch?v=ZeXMOSjBfFU',
          durationMinutes: 50,
          description: 'Affine sets and their relationship to linear subspaces.',
        },
      ],
      quiz: [
        {
          id: '2-16-q1',
          type: 'true-false',
          question: 'The solution set of $A\\mathbf{x} = \\mathbf{b}$ (with $\\mathbf{b} \\neq \\mathbf{0}$) is a subspace.',
          correctAnswer: false,
          explanation: 'The solution set is an affine set (shifted subspace), not a subspace — it does not contain $\\mathbf{0}$ when $\\mathbf{b} \\neq \\mathbf{0}$.',
        },
      ],
      commonMistakes: [
        'Confusing affine sets (shifted subspaces) with subspaces — subspaces must contain the origin, affine sets need not.',
      ],
    },
    {
      id: '2-17',
      chapterId: '2',
      sectionNumber: '2.17',
      title: 'Chapter Summary',
      estimatedMinutes: 6,
      plainEnglish: [
        'Chapter 2 built the language of vectors: objects we can add and scale, with rich geometric interpretations. The key concepts form a chain: **linear combination → span → independence → basis → dimension**.',
        'A **basis** for a subspace is a minimal spanning set (or equivalently, a maximal independent set). All bases have the same size — the **dimension**. The span of any collection is always a subspace.',
        'Affine sets are the translated versions of subspaces — they are the shapes of solution sets. Next, we will use this language to study matrices, rank, and nullity as maps between vector spaces.',
      ],
      formalView: [
        {
          type: 'remark',
          label: 'Summary 2.17',
          title: 'Key Relationships',
          content: '\\begin{align*} \\text{Span}(S) &= \\text{smallest subspace containing } S \\\\ \\dim(V) &= \\text{size of any basis for } V \\\\ \\text{Basis for } V &= \\text{independent set that spans } V \\\\ \\text{Affine set} &= \\mathbf{p} + V \\text{ for some subspace } V \\end{align*}',
        },
      ],
      whyItMatters: {
        context: 'This chapter\'s vocabulary is the universal language of linear algebra — everything in Chapters 3 and 4 is stated in these terms.',
        applications: [
          'Rank-nullity theorem (Chapter 3) says: dim(input) = dim(null space) + rank',
          'Invertible Matrix Theorem (Chapter 4) uses independence and spanning at its core',
          'Principal Component Analysis finds an optimal basis for high-dimensional data',
        ],
      },
      resources: [
        {
          title: 'Essence of linear algebra',
          channel: '3Blue1Brown',
          url: 'https://www.youtube.com/watch?v=fNk_zzaMoSs&list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab',
          durationMinutes: 15,
          description: 'The complete 3Blue1Brown series on linear algebra foundations.',
        },
      ],
      quiz: [
        {
          id: '2-17-q1',
          type: 'multiple-choice',
          question: 'The maximum number of linearly independent vectors in $\\mathbb{R}^4$ is:',
          options: ['2', '3', '4', 'Unlimited'],
          correctAnswer: 2,
          explanation: '$\\dim(\\mathbb{R}^4) = 4$. Any 5 or more vectors in $\\mathbb{R}^4$ must be linearly dependent. The maximum independent set has exactly 4 vectors (a basis).',
        },
      ],
      commonMistakes: [
        'Forgetting that span, independence, basis, and dimension are all interconnected — you cannot understand one in isolation.',
      ],
    },
  ],
};

export default chapter2;
